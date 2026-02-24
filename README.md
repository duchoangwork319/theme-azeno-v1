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

- **🎯 Multi-Section Support** - 80+ carefully crafted Liquid sections including:
  - Product displays (grids, tabs, carousels)
  - Blog and article layouts
  - Header and footer variations
  - Custom forms and contact sections
  - Newsletter and subscription components
  - Brand, testimonials, and team showcases

- **📱 Responsive Design** - Mobile-first approach with RTL support included

- **🎭 Multiple Header & Footer Variants** - Choose from 5 header designs and 4 footer layouts

- **📋 Advanced Form System** - Dynamic form validation and file upload capabilities with image compression

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

- **⚙️ Build Optimization** - Webpack-powered asset bundling with Babel transpilation

- **🌍 Multi-language & Currency** - Built-in locale and currency selector snippets

## 📁 Project Structure

```
azeno-v1/
├── assets/               # Compiled and static assets
│   ├── css-*.css        # Stylesheet files
│   ├── *.js             # JavaScript bundles
│   └── vendor.js        # Third-party libraries
├── blocks/              # Reusable theme blocks
├── client/              # Source JavaScript files
│   └── js/
│       ├── custom-form.js      # Form handling logic
│       ├── faker.js            # Data generation utilities
│       └── components/
│           ├── validation.js   # Form validation
│           └── file.js         # File upload & compression
├── config/              # Theme configuration
│   ├── settings_data.json      # Theme settings values
│   └── settings_schema.json    # Theme settings schema
├── layout/              # Theme layouts
├── locales/             # Translation files
├── sections/            # Theme sections (80+ Liquid files)
├── snippets/            # Reusable Liquid snippets (60+ files)
├── static/              # Static configuration files
├── templates/           # Page templates
│   ├── *.json          # JSON template files
│   ├── *.liquid        # Liquid template files
│   └── customers/      # Customer account pages
├── package.json         # Dependencies & scripts
├── webpack.config.js    # Webpack configuration
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Shopify CLI v3.90.1+
- Valid Shopify store credentials

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

The project includes the following npm scripts:

- **`npm run build`** - Build all assets using Webpack and Babel
- **`npm run webpack:prd`** - Build assets for production
- **`npm run webpack:dev`** - Build assets for development
- **`npm run lint`** - Check code for linting issues
- **`npm run lint:fix`** - Auto-fix linting issues
- **`npm run dev:pull`** - Pull from development store
- **`npm run dev:push`** - Push to development store
- **`npm run dev:watch`** - Start development server with live reload
- **`npm run prd:pull`** - Pull from production store
- **`npm run prd:pull-data`** - Pull only config, templates, and locales from production
- **`npm run prd:push`** - Push to production store
- **`npm run prd:sync-commit`** - Commit synced live store settings
- **`npm run logout`** - Logout from Shopify CLI

## 🔨 Build & Development

### Build Assets

Compiles all JavaScript files from `client/js/` directory into individual bundles in `assets/`:

```bash
npm run build
```

This uses Webpack to:
- Transpile ES6+ code with Babel
- Create separate bundles for each entry file
- Auto-prefix CSS and optimize assets

### Development Workflow

**Push to Development Store:**
```bash
npm run dev:push
```
Pushes templates, blocks, assets, and sections to the development store.

**Live Development with Theme Editor Sync:**
```bash
npm run dev:watch
```
Launches the Shopify theme development server with live reload and editor sync enabled for the development store (`5dla-dev.myshopify.com`).

## 🌐 Theme Management

### Store Information

- **Development Store**: `5dla-dev.myshopify.com`
- **Production Store**: `d51qk1-qd.myshopify.com`

### Production Deployment

**Pull from Production:**
```bash
npm run prd:pull
```
Pulls all theme files from production store, excluding package.json.

**Pull Config & Locales:**
```bash
npm run prd:pull-data
```
Pulls only config, templates, and locales from production store for selective updates.

**Push to Production:**
```bash
npm run prd:push
```
Deploys all theme files to the production store.

**Sync Commit:**
```bash
npm run prd:sync-commit
```
Creates a git commit for synced live store settings.

### Authentication

```bash
npm run logout
```
Removes Shopify CLI authentication.

## 🎯 Key Components

### Custom Form System

The custom form system provides robust handling for form submissions with validation:

- **Location**: [client/js/](client/js/)
- **Main Files**:
  - [client/js/main.js](client/js/main.js)
  - [client/js/faker.js](client/js/faker.js)
  - [client/js/style.js](client/js/style.js)
  - [client/js/components/](client/js/components/)
  - [client/js/services/](client/js/services/)
  - [client/js/theme/](client/js/theme/)
  - [client/js/utils/](client/js/utils/)

**Features:**
- Real-time form validation
- File upload with automatic compression
- Image optimization (converts to JPEG, 60% quality)
- Error handling and user feedback
- Integration with custom Liquid section

### Form Validation

Comprehensive validation system supporting:
- Required field validation
- Email format verification
- Phone number validation
- Custom validation rules

### File Upload & Compression

Automatic image compression using `compressorjs`:
- Reduces file size without quality loss
- Converts images to JPEG format
- Configurable compression quality

## 📚 Technologies

- **Frontend Framework**: Liquid (Shopify template language)
- **JavaScript**: ES6+ with Babel transpilation
- **Build Tool**: Webpack 5 + ESBuild
- **CSS Processing**: PostCSS, Autoprefixer, CSSNano, CSS Minimizer
- **Linting**: ESLint 10
- **Package Manager**: npm
- **CLI**: Shopify CLI v3.90.1
- **Transpilation**: Babel 7.29, Terser
- **Utilities**: 
  - Faker.js - Mock data generation
  - Compressor.js - Image compression
  - Crypto-js - Cryptographic functions
  - jQuery - DOM manipulation
  - Lodash - Utility functions

### Dependencies

**Runtime Dependencies:**
```json
{
  "@faker-js/faker": "^10.2.0",
  "compressorjs": "^1.2.1",
  "crypto-js": "^4.2.0"
}
```

**Dev Dependencies:**
```json
{
  "@babel/cli": "^7.28.6",
  "@babel/core": "^7.29.0",
  "@babel/preset-env": "^7.29.0",
  "@eslint/js": "^10.0.1",
  "@shopify/cli": "^3.90.1",
  "autoprefixer": "^10.4.24",
  "babel-loader": "^10.0.0",
  "css-loader": "^7.1.3",
  "css-minimizer-webpack-plugin": "^7.0.4",
  "cssnano": "^7.1.2",
  "esbuild": "0.27.2",
  "eslint": "^10.0.0",
  "globals": "^17.3.0",
  "mini-css-extract-plugin": "^2.10.0",
  "postcss": "^8.5.6",
  "postcss-loader": "^8.2.0",
  "terser": "^5.46.0",
  "webpack": "^5.105.2",
  "webpack-cli": "^6.0.1"
}
```

## 📦 Asset Organization

### CSS Files (50+ stylesheets)
- Section-specific styles: `css-section-*.css` (40+ files for each major section)
- Feature styles: `css-blog.css`, `css-cart-page.css.liquid`, `css-collection.css.liquid`, etc.
- Component styles: `css-effect.css`, `css-rtl.css`, `css-vendor.css`, `css-site.css.liquid`
- Theme variables: `css-variables.css.liquid`
- Third-party styles: `default-skin.css`, `feather.css`, `icomoon.css`, `photoswipe.css`

### JavaScript Files
- Third-party libraries: jQuery, Lodash, Handlebars, Photoswipe
- Utility scripts: Debounce, Spinner, Countdown, Zoom
- Image handling: Lazysizes, Image zoom
- Form utilities: Custom form, facets, predictive search

## 🎨 Sections (90+)

The theme includes comprehensive sections for all major e-commerce needs, including:

**Product Sections:**
- `featured-products.liquid` - Product grid display
- `featured-product-tabs.liquid` - Tabbed product layout
- `custom-product-card.liquid` - Custom product cards
- `buy-together.liquid` - Product bundle section

**Blog & Content:**
- `featured-blog-post.liquid` - Single blog post display
- `blog-template.liquid` - Blog list template
- `article-breadcrumb.liquid` - Article navigation

**Layout Components:**
- Multiple banner options (single, double, triple)
- Image with text sections
- Video embedding
- Newsletter signup
- Contact forms

**Navigation & Menus:**
- Multiple header variants
- Footer options
- Sidebar navigation

## 📄 Templates

Pre-built templates for common Shopify pages:
- Product pages (with compare and wishlist options)
- Collection pages with filters
- Blog and article pages
- Customer account pages (login, register, addresses, orders)
- Cart and checkout
- 404 error page
- FAQ and warranty pages

## 👤 Author

**DucHoang**

## 📄 License

ISC

---

## 🤝 Contributing

To contribute to this theme:

1. Make your changes in the `client/js/` directory for JavaScript
2. Run `npm run build` to compile assets
3. Use `npm run dev:watch` for live testing
4. Push changes using appropriate npm scripts

## 📞 Support

For issues or questions regarding this theme, please contact the development team or refer to the Shopify CLI documentation at https://shopify.dev/themes/tools/cli

---

**Version:** 1.0.0  
**Status:** Active Development
