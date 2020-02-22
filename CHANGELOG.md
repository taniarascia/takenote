# Changelog

All notable changes to this project will be documented in this file.

## v0.5.0 02/22/2020

GitHub authentication

### Added

- Log in/log out functionality implemented using GitHub OAuth

### Changed

- Refactored large files into smaller components
- Added folder structure and technologies to README
- Modify deployment scripts and Dockerfile to allow local development with GitHub authentication
- Prompt to confirm exit added when notes have not yet been synced

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
