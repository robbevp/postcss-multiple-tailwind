const postcss = require('postcss')
const path = require("path")

module.exports = (root, result) => {
  const plugins = [];
  root.walkAtRules('multiple-tailwind', atRule => {
    const file =  `${path.dirname(result.opts.from)}/${atRule.params.length ? atRule.params : 'tailwind.config.js'}`
    try {
      const tailwindcss = require("tailwindcss")(file)
      plugins.push(...tailwindcss.plugins)
    } catch (_) {
      throw new Error(`Cannot find config file '${file}'`);
    }
    atRule.remove();
  })
  return plugins.length ? postcss(plugins).process(root, { from: undefined }) : [];
};
