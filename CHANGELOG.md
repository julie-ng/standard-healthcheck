# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0](https://github.com/julie-ng/standard-healthcheck/compare/v0.1.0...v1.0.0) (2020-04-11)


### ⚠ BREAKING CHANGES

* **healthcheck:** module is now called directly, e.g. `healthcheck({…})`
NOT instantiated `new Healthcheck({…})` and referencing `endpoint()` method

### Features

* **healthcheck:** refactor into function, not a class ([cc7be2d](https://github.com/julie-ng/standard-healthcheck/commit/cc7be2dba9ae5f51c5febed5712ccc7610c2ba63))
* **secrets:** variables ending in _PASS included, was part of refactor, updated tests ([63928bf](https://github.com/julie-ng/standard-healthcheck/commit/63928bf6e416c27f551a1c13315076c05b2d2ecf))

## [0.1.0](https://github.com/julie-ng/standard-healthcheck/compare/v0.0.1...v0.1.0) (2020-02-19)


### Features

* **uptime:** add human readable format ([dcf5d7f](https://github.com/julie-ng/standard-healthcheck/commit/dcf5d7fcaec14a7094dcacd877aa8effc818b150))


### Bug Fixes

* **util:** use refactored helpers ([74263ae](https://github.com/julie-ng/standard-healthcheck/commit/74263aebbf036098f116864600aad159bd19ef9c))

### 0.0.1 (2020-02-19)
