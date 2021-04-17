const postcss = require('postcss')

module.exports = (root, result) => {
  const plugins = [];
  root.walkAtRules('multiple-tailwind', atRule => {
    const file =  atRule.params.length ? atRule.params : `${result.opts.file.dirname}/tailwind.config.js`
    const tailwindcss = require("tailwindcss")(file)
    plugins.push(...tailwindcss.plugins)
    atRule.remove();
  })
  return plugins.length ? postcss(plugins).process(root, { from: undefined }) : [];
};
