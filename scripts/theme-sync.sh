#!/bin/bash
#
# Pull/push the Shopify theme for any environment defined under ./.env,
# replacing the per-environment npm scripts (prd:pull:theme, dev:push:assets, ...).
#
# Usage:
#   scripts/theme-sync.sh <pull|push> <env> [target...]
#
set -euo pipefail

SCRIPT_NAME="$(basename "$0")"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_DIR="$ROOT_DIR/.env"

DRY_RUN=0

usage() {
  cat <<EOF
Usage: $SCRIPT_NAME <action> <env> [target...] [options]

Pull or push the Shopify theme for a given environment, without hardcoding
a separate npm script per environment/target combination.

Actions:
  pull                 Pull theme files from Shopify down to the repo
  push                 Push local theme files up to Shopify
  login                Run 'shopify auth login'
  logout                Run 'shopify auth logout'

Env:
  Any environment with a matching .env/.env.<env> file, e.g.:
    dev                 Uses .env/.env.dev
    prd                 Uses .env/.env.prd

Target (optional, default: theme). Pass multiple to combine them, e.g.
'assets sections layout':
  theme                 Full theme (exclusive - cannot combine with others)
  data                  config/*, templates/*, locales/* only (pull only, exclusive)
  blocks                Full pull, preserving local ./blocks changes (pull only, exclusive)
  assets                assets/* only
  sections               sections/* only
  layout                layout/* only
  snippets               snippets/* only (push only)

Options:
  --dry-run             Print the resulting shopify CLI command instead of running it
  -h, --help            Show this help text

Note: if no theme id is configured for the environment, the Shopify CLI
itself will prompt you to choose a theme before pushing/pulling.

Examples:
  $SCRIPT_NAME pull dev theme
  $SCRIPT_NAME pull prd data
  $SCRIPT_NAME push dev assets
  $SCRIPT_NAME push prd sections layout
  $SCRIPT_NAME push dev assets sections snippets --dry-run
EOF
}

die() {
  echo "Error: $1" >&2
  exit 1
}

# --- parse args -------------------------------------------------------------

ACTION=""
ENV_NAME=""
POSITIONAL=()

for arg in "$@"; do
  case "$arg" in
    -h|--help)
      usage
      exit 0
      ;;
  esac
done

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -*)
      die "Unknown option: $1 (see --help)"
      ;;
    *)
      POSITIONAL+=("$1")
      shift
      ;;
  esac
done

ACTION="${POSITIONAL[0]:-}"
ENV_NAME="${POSITIONAL[1]:-}"
TARGETS=("${POSITIONAL[@]:2}")
[[ ${#TARGETS[@]} -eq 0 ]] && TARGETS=(theme)

[[ -n "$ACTION" ]] || { usage; die "Missing <action>"; }
[[ -n "$ENV_NAME" ]] || { usage; die "Missing <env>"; }

case "$ACTION" in
  pull|push|login|logout) ;;
  *) die "Unknown action '$ACTION' (expected pull, push, login, logout)" ;;
esac

if [[ ${#TARGETS[@]} -gt 1 ]]; then
  for t in "${TARGETS[@]}"; do
    case "$t" in
      theme|data|blocks)
        die "Target '$t' cannot be combined with other targets"
        ;;
    esac
  done
fi

ENV_FILE="$ENV_DIR/.env.$ENV_NAME"
if [[ "$ACTION" != "login" && "$ACTION" != "logout" ]]; then
  [[ -f "$ENV_FILE" ]] || die "No env file found at $ENV_FILE"
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
  [[ -n "${SHOPIFY_CLI_STORE_DOMAIN:-}" ]] || die "SHOPIFY_CLI_STORE_DOMAIN missing from $ENV_FILE"
  [[ -n "${SHOPIFY_CLI_THEME_TOKEN:-}" ]] || die "SHOPIFY_CLI_THEME_TOKEN missing from $ENV_FILE"
fi

# --- build the shopify CLI command ------------------------------------------

CMD=(shopify theme "$ACTION" -s "$SHOPIFY_CLI_STORE_DOMAIN" --password "$SHOPIFY_CLI_THEME_TOKEN")

if [[ "$ACTION" == "pull" || "$ACTION" == "push" ]]; then
  CMD+=(--nodelete)
  [[ -n "${SHOPIFY_CLI_THEME_ID:-}" ]] && CMD+=(-t "$SHOPIFY_CLI_THEME_ID")

  for TARGET in "${TARGETS[@]}"; do
    case "$TARGET" in
      theme)
        if [[ "$ACTION" == "pull" ]]; then
          CMD+=(--ignore package.json --ignore "assets/*")
        fi
        ;;
      data)
        [[ "$ACTION" == "pull" ]] || die "Target 'data' is only valid for pull"
        CMD+=(--only "config/*" --only "templates/*" --only "locales/*")
        ;;
      blocks)
        [[ "$ACTION" == "pull" ]] || die "Target 'blocks' is only valid for pull"
        ;;
      assets)
        CMD+=(--only "assets/*")
        ;;
      sections)
        CMD+=(--only "sections/*")
        ;;
      layout)
        CMD+=(--only "layout/*")
        ;;
      snippets)
        [[ "$ACTION" == "push" ]] || die "Target 'snippets' is only valid for push"
        CMD+=(--only "snippets/*")
        ;;
      *)
        die "Unknown target '$TARGET' (expected theme, data, blocks, assets, sections, layout, snippets)"
        ;;
    esac
  done
fi

if [[ "$DRY_RUN" -eq 1 ]]; then
  printf '%q ' "${CMD[@]}"
  echo
  [[ "$ACTION" == "pull" && "${TARGETS[0]}" == "blocks" ]] && echo "(dry-run) would then run: git stash push ./blocks && git checkout -- . && git stash pop"
  exit 0
fi

echo "Running: ${CMD[*]/--password $SHOPIFY_CLI_THEME_TOKEN/--password ****}"
"${CMD[@]}"

if [[ "$ACTION" == "pull" && "${TARGETS[0]}" == "blocks" ]]; then
  git -C "$ROOT_DIR" stash push ./blocks
  git -C "$ROOT_DIR" checkout -- .
  git -C "$ROOT_DIR" stash pop
fi
