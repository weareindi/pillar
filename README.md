![Pillar](./pillar--splash-logo.png)

# Pillar

A Twig-powered pattern library and design-system boilerplate.

## Requirements

- PHP 8.4 or newer
- Composer 2
- Node.js and npm

## Installation

Create a project through Composer:

```sh
composer create-project weareindi/pillar my-pattern-library
cd my-pattern-library
npm install
cp .env.gulp.example .env.gulp
```

For a manual installation, download the project and run `composer install` followed by the Node setup above.

## Local Pillar Core development

Composer automatically prefers a sibling `pillar-core` checkout when the repositories use this layout:

```text
projects/
├── pillar/
└── pillar-core/
```

The checkout is symlinked into `vendor/weareindi/pillar-core`, so Core edits are immediately available in Pillar. If the sibling directory does not exist, Composer resolves the published package from Packagist instead.

After adding or removing the local checkout, refresh the locked source with:

```sh
composer update weareindi/pillar-core --with-dependencies
```

## Running Pillar

Start the PHP development server:

```sh
php pillar server
```

Pillar is then available at http://localhost:8080.

## Asset development

The asset pipeline uses Gulp 5 with Dart Sass, PostCSS, Webpack, Terser, and Vite. Sass wildcard imports remain supported through the custom module-aware importer.

```sh
npm run build   # production CSS, JavaScript, and service worker
npm run watch   # rebuild changed source and pattern files
npm run gulp    # watch files and run the Vite development proxy
```

`npm run gulp` proxies the Pillar PHP server configured by `HOST` and `PORT` in `.env.gulp`, and serves the development site at http://localhost:5173.

New Sass should use the module APIs (`@use` and `@forward`). Project component files can access the shared bootstrap module with:

```scss
@use '_src/scss/bootstrap' as *;
```

## Commands

Run `php pillar list` for the complete command list. The main commands include:

```sh
php pillar generate
php pillar export
php pillar html
php pillar server
```

## Documentation

More information is available in the project wiki:

- [Usage](https://github.com/weareindi/pillar/wiki/Usage)
- [CLI commands](https://github.com/weareindi/pillar/wiki/CLI)
- [Twig functions and filters](https://github.com/weareindi/pillar/wiki/Functions-&-Filters)

## Version

Current development version: `2.0.0`.
