# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## v1.0.1
Made a small refactor so we don't have to mirror Tailwind's internal structure.

### Internal changes
* Updated devDependencies
* Make published files explicit

## v1.0.0
### Breaking change
From v1.0.0 onwards only Tailwindcss 3.x is supported. If you are stuck to tailwindcss 2.x, you can keep using a version v0.4.0 without any issues.

### Bug fixes
Make sure Tailwind rebuilds css when file in content changes (#132)

### Internal changes
Internal dependencies were updated to their latest versions
## v0.4.0

Adds support for tailwindcss 3.x [#92](https://github.com/robbevp/postcss-multiple-tailwind/pull/92) [#93](https://github.com/robbevp/postcss-multiple-tailwind/pull/93)

Removed automatic tests for Node v15, since this version is no longer supported.

### Internal changes
* Updated devDependencies

## v0.3.0

Adds two configuration options
**Mode (Default = "manual")**
The mode allows a user to set the mode to auto or manual. The auto mode doesn't require @multiple-tailwind to be present in a css file for it to be processed by tailwindcss.

**defaultConfig (Default = "tailwind.config.js")**
Sets the config file when the user doesn't specify a config inside the css file.

### Upgrading
The defaults for these two options are the same as the previous behaviour of the app, so there are no steps required for upgrading.
## v0.2.0

* Throw an error if a config file could not be found

## v0.1.0

Initial release