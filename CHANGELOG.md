# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).
## Notice
This project is still in an early stage. Before version 1.0.0 is reached, there might be breaking changes with minor versions. 

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