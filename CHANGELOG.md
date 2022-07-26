# Changelog
All notable changes to this project will be documented in this file.

## [1.10.0 - 1.10.1] - 2022-07-26
### Change
- Build tools update
- Change to module based Gulp. `.js` file extensions now required on `import`

## [1.9.7] - 2021-12-04
### Change
- Refactor/Linting
- Build tools update

## [1.9.2 - 1.9.6] - 2021-10-01
### Fixed
- Update filters, functions, and global context classes.
- Core Image Controller: hex2rgb conversion
### Added
- Template Boilerplates. Used in combination with `pillar generate` to pre-populate new patterns.

## [1.9.1] - 2021-04-03
### Added
- Add image placeholder route. - You can now generate images using the URI: `/image/1280x800` or `/image/1280x800/f00`
### Change   
- Changed 'sitemap' route to 'pages'

## [1.8.1] - 2021-03-02
### Bugfix
- Allow for `getenv` function. Symfony/Dotenv 5.x made some amends so we're required to pass true to the Dotenv constructor.

## [1.8.0] - 2021-03-02   
### Change   
- Updates for Twig 3.x
### Bugfix
- Fixes for Twig 3.x

## [1.7.0] - 2021-03-02
### Change
- Updated pillar-core build tools
- Updated packages to latest throughout Pillar ecosystem
- Updated core built tools
### Added
- Added `php pillar gulp` command

## [1.5.0] - 2020-06-12
### Added
- Add TWIG global context support. See `/App/TwigGlobalContextData`

## [1.4.0] - 2019-09-01
### Added
- Added HTML page export

## [1.3.0] - 2019-07-24
### Added
- Allow for alternative page data sets

## [1.2.2] - 2019-07-16
### Added
- Text align render frame switch

## [1.2.1] - 2019-05-20
### Bugfix
- Fixed custom filters/functions not working on isolated templates

### Change
- Removed unnecessary slash from ExampleFunction
- Amended server commands execution method
- Amended `.env.example` to include more relevant comments

## [1.2.0] - 2019-04-14
### Added
- Added Template Generate command. Usage: `php pillar generate {{ template/name }}`

## [1.1.2] - 2019-01-05
### Bugfix
- Fixed issue with data not merging recursively

## [1.1.1] - 2019-01-03
### Bugfix
- Fixed issue with data being merged at incorrect level

## [1.1.0] - 2019-01-02
### Added
- Data can now be broken out across multiple `.json` files rather than a single `data.json` file.
### Bugfix
- Fixed issue where pages with same directory name and depth as patterns would use pattern data instead of page data

## [1.0.2] - 2018-12-29
### Bugfix
- Fixed 'undefined index' issue that was preventing the display of patterns under certain situations (eg. pattern isolation)

## [1.0.1] - 2018-12-23
### Added
- Re-added Export command. `php pillar export help` for more info
- Basic example template with 'alternative' data

### Change
- Changed required `.env` keys for updated export command.
    - From: `EXPORT_PATTERNS_DEST` to `EXPORT_LIBRARY_DEST`
    - From: `EXPORT_DIRECTORY_SRC` to `EXPORT_ASSETS_SRC`
    - From: `EXPORT_DIRECTORY_DEST` to `EXPORT_ASSETS_DEST`
- Export command now takes options including `--library` and/or `--assets`.

## [1.0.1-beta] - 2018-12-23
### Change
- Revert core naming back to Pillar rather than PillarCore
- Remove PSR-4 for 'Pillar' in base
- Remove namespacing from custom console commands

## [1.0.0-beta] - 2018-12-22
### Change
- Major overhaul of Pillar Core codebase. Tests indicate the platform is now twice as fast compared to `0.6.3`
- Custom Twig Filters, Functions and Pillar console commands now live in their respective directories inside `App`
- Custom Twig Filters and Functions can now be written as documented here: https://twig.symfony.com/doc/2.x/advanced.html#creating-an-extension - This should make your lives easier when migrating the same filters and functions to other projects outside of Pillar

## [0.6.3] - 2018-07-28
### Added
- Include example extensions file

## [0.6.2] - 2018-05-10
### Change
- Remove need to define `EXPORT_PATTERNS_SRC`.

## [0.6.0] - 2018-05-06
### Change
- Replaced `php pillar export` command with `php pillar exportpatterns` and `php pillar exportdirectory`
### Added
- Added 'php pillar exporthtml' command

## [0.4.0] - 2018-03-24
### Change
- Moved pillar views to pillar-core package.
- Change demo command to example command
- Readme
### Added
- Included common starter templates

## [0.3.0] - 2018-02-17
### Added
- Add core export command

## [0.2.3] - 2017-08-28
### Added
- Add example custom TWIG filters and functions which are now available in `Pillar-Core 0.1.4`

## [0.2.2] - 2017-08-28
### Added
- .env support to console server command
