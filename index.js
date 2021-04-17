const postcss = require('postcss')
const path = require("path")

module.exports = (root, result) => {
  const plugins = [];
  root.walkAtRules('multiple-tailwind', atRule => {
    const file =  `${path.dirname(result.opts.from)}/${atRule.params.length ? atRule.params : 'tailwind.config.js'}`
    const tailwindcss = require("tailwindcss")(file)
    plugins.push(...tailwindcss.plugins)
    atRule.remove();
  })
  return plugins.length ? postcss(plugins).process(root, { from: undefined }) : [];
};
