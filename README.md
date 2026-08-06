![gg](./pillar--splash-logo.png)

# Pillar

Build your TWIG powered pattern library

---

## Installation

### Via Composer
- Execute `composer create-project weareindi/pillar {{ your destination directory }}`

### Manually
- Download this package manually.
- Extract to your desired working directory.
- Run `composer install` to get all the required dependencies (including Pillar-Core).

### Local Pillar Core development

Composer automatically uses a sibling `pillar-core` checkout when the repositories have this layout:

```text
projects/
├── pillar/
└── pillar-core/
```

The package is symlinked into `vendor/weareindi/pillar-core`, so edits in Pillar Core are immediately available to Pillar. Run the following after adding or removing the sibling checkout to refresh the locked package source:

```sh
composer update weareindi/pillar-core --with-dependencies
```

If no matching sibling directory exists, Composer installs `weareindi/pillar-core` from Packagist normally.

## Loading

Feel free to boot the PHP built-in server using the command:  
`php pillar server`  

Open http://localhost:8080 in your browser.

---

## Gulp   

We've included a handy Gulp starter kit that slots right in to Pillar.   
With a focus on optimisation of your final project putting those 100% lighthouse scores within reach.   

Install the build dependencies and create your local Gulp environment file:

```sh
npm install
cp .env.gulp.example .env.gulp
```

The familiar Gulp workflow remains available through npm:

```sh
npm run build   # production CSS, JavaScript, and service worker
npm run watch   # rebuild changed source and pattern files
npm run gulp    # Vite proxy with live reload plus file watching
```

`npm run gulp` proxies the Pillar PHP server configured by `HOST` and `PORT`, and serves the development URL at http://localhost:5173.

---

Please checkout the [Wiki](https://github.com/weareindi/pillar/wiki) for more information about:
* [Usage](https://github.com/weareindi/pillar/wiki/Usage)
* [CLI Commands](https://github.com/weareindi/pillar/wiki/CLI)
* [Functions & Filters](https://github.com/weareindi/pillar/wiki/Functions-&-Filters)
