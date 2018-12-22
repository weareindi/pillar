# Changelog
All notable changes to this project will be documented in this file.

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
