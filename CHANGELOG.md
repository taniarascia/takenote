# Changelog

All notable changes to this project will be documented in this file.

## v0.4.0 02/03/2020

Initial release

### Added

- Created `CHANGELOG.md`
- Added Node/TypeScript backend for REST API calls
- Created CI/CD pipeline with `deploy.sh`, `.travis.yml` and `Dockerfile`

### Changed

- Migrated website from Netlify to DigitalOcean
- Added instructions for new local development to README
- Removed Netlify badge from README
- Removed Create React App and replaced with custom Webpack setup

### Removed

- Removed Service Worker due to the application no longer being fully client side
