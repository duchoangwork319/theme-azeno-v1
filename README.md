# 🎨 Azeno V1 - Shopify Theme

A modern, feature-rich Shopify theme built with advanced customization, form handling, and seamless theme management capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Build & Development](#build--development)
- [Theme Management](#theme-management)
- [Key Components](#key-components)
- [Technologies](#technologies)
- [Author](#author)

## 🌟 Overview

**Azeno V1** is a comprehensive Shopify theme solution designed for modern e-commerce stores. It provides extensive customization options, advanced form handling with validation, and streamlined deployment workflows for both development and production environments.

## ✨ Features

- **🎯 Multi-Section Support** - 91 carefully crafted Liquid sections including:
  - Product displays (grids, carousels, tabs, and grid layouts)
  - Blog and article layouts with search functionality
  - 5 header variants and 4 footer layouts
  - Custom forms, contact sections, and FAQ templates
  - Newsletter and subscription components
  - Brand showcases, testimonials, and team pages
  - Instagram integration and lookbook galleries
  - Slideshow and image transformation sections

- **📱 Responsive Design** - Mobile-first approach with RTL support included

- **🎭 Advanced Header & Footer System** - 5 header styles with sticky navigation, mobile responsive menu, search integration, and 4 footer layouts

- **📋 Advanced Form System** - Dynamic form validation, file upload with image compression, phone field support, back-in-stock forms, and custom form PHP handling

- **🏪 E-commerce Features**:
  - Product compare functionality
  - Wishlist support
  - Cart management
  - Collection browsing with filters
  - Customer account pages

- **🔧 Customizable Sections**:
  - Banners, sliders, and carousels
  - Image galleries and lookbooks
  - Instagram integration
  - Video sections
  - CTA blocks and newsletter signups

- **⚙️ Build Optimization** - Webpack-powered asset bundling with Babel transpilation and code minification

- **🌍 Multi-language & Currency** - Built-in locale and currency selector snippets

## 📁 Project Structure

```
azeno-v1/
├── assets/               # Compiled and static assets
│   ├── css-*.css        # Stylesheet files
│   ├── *.js             # JavaScript bundles
│   ├── dist/            # Webpack output directory
│   └── vendor files     # Third-party libraries
├── blocks/              # Reusable theme blocks
├── client/              # Source JavaScript files
│   └── js/
│       ├── main.js             # Global theme initialization
│       ├── faker.js            # Data generation utilities
│       ├── product.js          # Product page logic
│       ├── head-collection.js  # Collection header handling
│       ├── head-product.js     # Product header handling
│       ├── style.js            # Theme styling utilities
│       ├── components/
│       │   ├── file.js         # File upload & compression
│       │   ├── validation.js   # Form validation
│       │   ├── helpers.js      # Utility helpers
│       │   ├── grecaptcha.js   # reCAPTCHA integration
│       │   └── head-protected.js # Protected content handling
│       ├── services/
│       │   └── session.js      # Session management
│       ├── theme/              # Theme-specific modules
│       └── utils/              # Utility functions
├── config/              # Theme configuration
│   ├── settings_data.json      # Theme settings values
│   └── settings_schema.json    # Theme settings schema
├── layout/              # Theme layouts
│   ├── theme.liquid           # Main theme layout
│   └── password.liquid        # Password page layout
├── locales/             # Translation files
├── sections/            # Theme sections (91 Liquid files)
│   ├── Featured sections (product grids, galleries, carousels)
│   ├── Content sections (banners, blogs, testimonials)
│   └── Specialized sections (forms, Instagram, lookbooks, videos)
├── snippets/            # Reusable Liquid snippets (131 files)
│   ├── Header components (navigation, search, cart, mega-menu)
│   ├── Product & collection utilities
│   ├── Form components (validation, file upload)
│   ├── Media components (image handling, zoom, sliders)
│   └── SEO & tracking (JSON-LD, social sharing, analytics)
├── static/              # Static configuration files
├── templates/           # Page templates
│   ├── *.json          # JSON template files
│   ├── *.liquid        # Liquid template files
│   └── customers/      # Customer account pages
├── .env/               # Environment variables
│   ├── .env.dev        # Development environment
│   └── .env.prd        # Production environment
├── package.json         # Dependencies & script definitions
├── webpack.config.js    # Webpack configuration
├── eslint.config.mjs    # ESLint configuration
├── build.sh            # Build script
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher, v18+ recommended)
- npm or yarn
- Shopify CLI v3.91.1+
- Valid Shopify store credentials with theme development access

### Installation

1. **Clone or download the project**
```bash
cd azeno-v1
```

2. **Install dependencies**
```bash
npm install
```

3. **Authenticate with Shopify**
```bash
shopify auth login
```

### Available NPM Scripts

**Build & Development:**
- **`npm run build`** - Build all assets using Webpack with production optimization
- **`npm run webpack:prd`** - Build assets for production with minification and optimization
- **`npm run webpack:dev`** - Build assets for development with source maps

**Code Quality:**
- **`npm run lint`** - Check code for linting issues using ESLint
- **`npm run lint:fix`** - Auto-fix linting issues

**Theme Management (Development):**
- **`npm run dev:push`** - Deploy theme to development store
- **`npm run dev:watch`** - Watch and sync changes to development store with live theme editor
- **`npm run prd:push`** - Deploy theme to production store
- **`npm run prd:pull`** - Pull theme files from production store
- **`npm run prd:pulldata`** - Pull only config and templating data from production
- **`npm run prd:synccommit`** - Commit live store settings to git
- **`npm run logout`** - Logout from Shopify CLI

## 🔨 Build & Development

### Build Process

The project uses **Webpack** as the primary build tool to compile and optimize assets.

**Production Build:**
```bash
npm run webpack:prd
```
- Minifies JavaScript bundles
- Optimizes CSS with cssnano
- Generates source maps for debugging
- Creates separate output files for each entry point

**Development Build:**
```bash
npm run webpack:dev
```
- Generates unminified files for easier debugging
- Includes source maps
- Faster build time for development

### Development Workflow

**Push to Development Store:**
```bash
npm run dev:push
```

**Live Development with Theme Editor:**
```bash
npm run dev:watch
```
- Syncs changes in real-time to the development store
- Enables Shopify theme editor
- Watches for file changes automatically

## 🌐 Theme Management

### Production Deployment

Pull updates from production:
```bash
npm run prd:pull
```

Push to production:
```bash
npm run prd:push
```

Pull only configuration data:
```bash
npm run prd:pulldata
```

## 🔌 Key Components

### JavaScript Modules

| Module | Purpose |
|--------|---------|
| `main.js` | Global theme initialization and entry point |
| `product.js` | Product page specific functionality |
| `faker.js` | Test data generation using @faker-js/faker |
| `validation.js` | Form validation logic |
| `file.js` | File upload and image compression using compressorjs |
| `grecaptcha.js` | reCAPTCHA v3 integration |
| `session.js` | User session management |

### Key Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| @faker-js/faker | ^10.2.0 | Data generation and mocking |
| compressorjs | ^1.2.1 | Image compression for uploads |
| crypto-js | ^4.2.0 | Encryption/decryption utilities |
| webpack | ^5.105.2 | Module bundler and asset compiler |
| @babel/core | ^7.29.0 | JavaScript transpiler |
| @shopify/cli | ^3.91.1 | Shopify theme development CLI |
| eslint | ^10.0.0 | Code quality and linting |

## 📦 Technologies

- **Package Manager**: npm / yarn
- **Build Tool**: Webpack 5
- **JavaScript Transpiler**: Babel 7
- **CSS Processors**: PostCSS, Autoprefixer, cssnano
- **Linting**: ESLint
- **Bundling**: Webpack with Mini CSS Extract Plugin
- **CLI**: Shopify CLI v3.91.1+
- **Template Language**: Liquid (Shopify)

## 👤 Author

**DucHoang** - Theme developer and maintainer

---

**Last Updated**: March 2026
**Theme Version**: 1.0.0
**License**: ISC
