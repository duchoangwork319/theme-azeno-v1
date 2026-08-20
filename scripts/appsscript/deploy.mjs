"use strict";

/**
 * Usage: node deploy.mjs <target>
 *   <target> should be one of: dev.5dla, main.5dla
 */

import { execSync } from "child_process";
import { readFileSync } from "fs";
import path from "path";

const VALID_TARGETS = ["dev.5dla", "main.5dla"];

const target = process.argv[2] || "dev.5dla";

if (!VALID_TARGETS.includes(target)) {
  console.error(
    `Unknown target "${target}". Expected one of: ${VALID_TARGETS.join(", ")}`
  );
  process.exit(1);
}

const targetDir = path.join(process.cwd(), "appsscript", target);

// On Windows, npx resolves to a .cmd shim, which Node refuses to spawn
// directly without a shell (EINVAL). execSync always runs through a shell
// and takes a single pre-built command string, so - unlike execFileSync
// with shell: true - there's no args array left unescaped (DEP0190); we
// quote each argument ourselves instead.
const quoteArg = (arg) => `"${String(arg).replace(/"/g, '\\"')}"`;

const runClasp = (args, { capture = false } = {}) => {
  const command = ["npx", "clasp", ...args].map(quoteArg).join(" ");

  return execSync(command, {
    cwd: targetDir,
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "inherit"] : "inherit",
  });
};

const pad2 = (n) => String(n).padStart(2, "0");

const buildTimestampDescription = () => {
  const now = new Date();
  const date = `${now.getFullYear()}${pad2(now.getMonth() + 1)}${pad2(now.getDate())}`;
  const time = `${pad2(now.getHours())}-${pad2(now.getMinutes())}-${pad2(now.getSeconds())}`;
  return `D-${date}-${time}`;
};

// `clasp deployments` always returns exactly two entries: the live @HEAD
// deployment (used for testing) and one versioned @vX deployment (the one
// actually wired up externally). We redeploy whichever one isn't @HEAD.
const findVersionedDeploymentId = (deploymentsOutput) => {
  const lines = deploymentsOutput
    .split("\n")
    .filter((line) => line.trim().startsWith("-"));

  const versioned = lines.find((line) => !line.includes("@HEAD"));

  if (!versioned) {
    throw new Error(
      `Could not find a versioned (non-@HEAD) deployment:\n${deploymentsOutput}`
    );
  }

  const [, deploymentId] = versioned.trim().match(/^-\s*(\S+)/) || [];

  if (!deploymentId) {
    throw new Error(`Could not parse deployment id from line: "${versioned}"`);
  }

  return deploymentId;
};

const run = () => {
  const { scriptId } = JSON.parse(
    readFileSync(path.join(targetDir, ".clasp.json"), "utf8")
  );

  console.log(`\n> Pushing ${target}...`);
  runClasp(["push", "-f"]);

  console.log(`\n> Looking up deployments for ${scriptId}...`);
  const deploymentsOutput = runClasp(["deployments", scriptId], {
    capture: true,
  });
  console.log(deploymentsOutput);

  const deploymentId = findVersionedDeploymentId(deploymentsOutput);
  const description = buildTimestampDescription();

  console.log(`> Redeploying ${deploymentId} as "${description}"...`);
  runClasp(["redeploy", "-d", description, deploymentId]);
};

run();
