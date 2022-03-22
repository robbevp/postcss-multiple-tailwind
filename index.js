const path = require("path");
const fs = require("fs");

const setupTrackingContext =
  require("tailwindcss/lib/lib/setupTrackingContext").default;
const processTailwindFeatures =
  require("tailwindcss/lib/processTailwindFeatures").default;

module.exports = (opts = {}) => {
  /*
   * Mode: default = manual
   * Should be manual or auto.
   * Auto allows user to leave out @multiple-tailwind;
   * Manual requires a declaration of @multiple-tailwind; in every file that should be processed by tailwind.
   */
  const mode = opts.mode ? opts.mode : "manual";

  /*
   * defaultConfig: default = tailwind.config.js
   * default name of the tailwind config file if no param is given
   */
  const defaultConfig = opts.defaultConfig
    ? opts.defaultConfig
    : "tailwind.config.js";

  return (root, result) => {
    let config;
    let count = 0;

    // Set config to default if mode is auto and no config is specified
    if (mode === "auto") config = defaultConfig;

    root.walkAtRules("multiple-tailwind", (atRule) => {
      if (count > 0)
        throw new Error(
          `You registered '@multiple-tailwind' more than once in '${result.opts.from}'`
        );
      config = atRule.params.length ? atRule.params : defaultConfig;
      atRule.remove();
      count++;
    });

    // We silently return if there is no config given
    if (!config) return;

    const file = `${path.dirname(result.opts.from)}/${config}`;
    try {
      fs.accessSync(file, fs.constants.F_OK);
    } catch (_) {
      throw new Error(`Cannot find config file '${file}'`);
    }

    // This part replicates the structure in tailwindcss/lib/index.js
    // We need to do this to make sure all files are tracked and declared
    processTailwindFeatures(setupTrackingContext(file))(root, result);
  };
};

module.exports.postcss = true;
