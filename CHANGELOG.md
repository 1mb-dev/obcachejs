# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-19

### Added
- Promise support for `wrap()` - use async/await without callbacks
- TypeScript type definitions (`index.d.ts`)
- GitHub Actions CI pipeline
- ESLint configuration
- Dependabot for automated dependency updates

### Changed
- **BREAKING**: Minimum Node.js version is now 18
- Upgraded `lru-cache` from v2 to v11
- Upgraded `redis` from v3 to v5
- Upgraded `debug` to v4
- Rebranded from `obcache` to `obcachejs`
- Updated repository URLs to github.com/vnykmshr/obcachejs

### Fixed
- Compatibility with modern Node.js versions
- LRU cache API compatibility issues

### Removed
- Support for Node.js < 18
