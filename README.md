**Notice: Since v2.3 Tailwindcss contains [a builtin directive](https://tailwindcss.com/docs/functions-and-directives#config) to handle multiple config files. If you are starting a new project, you probably want to use their `@config` directive instead of this plugin.**

# PostCSS-Multiple-Tailwind

[PostCSS](https://github.com/postcss/postcss) plugin to process multiple tailwindcss configs easily.

```
+-- admin
|   +-- index.css
|   +-- tailwind.config.js
+-- front-end
|   +-- index.css
|   +-- tailwind.config.js
+-- postcss.config.js
+-- package.json
```

This allows you to have a different theme for the two css files, or have different purge settings for both. (The [configurations presets](https://tailwindcss.com/docs/presets) are very handy to allow all your configurations to share the same base.)

## Basic usage
**Add `@multiple-tailwind;` to your input files.**

```css
@multiple-tailwind;
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Postcss-multiple-tailwind will insert tailwindcss into the postcss process with the `tailwind.config.js` in the same folder as the input file.

You can also provide a different filename:

```css
@multiple-tailwind tailwind-admin.config.js;
@tailwind base;
@tailwind components;
@tailwind utilities;
```
## Installation

**Step 1:** Install plugin:

```sh
yarn add -D postcss-multiple-tailwind
```
Note that you also should already have postcss and tailwindcss installed.


**Step 2:** Add the plugin to plugins list and remove tailwindcss:

```diff
module.exports = {
  plugins: [
-   require('tailwindcss'),
+   require('postcss-multiple-tailwind'),
    require('autoprefixer')
  ]
}
```
## Options
| Property        | Type                                                   | Description                                                                                                                             |
| --------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| mode            | "manual", "auto" <br> **Default: "manual"**            | The mode determines whether `@multiple-tailwind;` is required in each file to be processed. When setting to auto, it is not required.   |
| defaultConfig   | string <br> **Default: "tailwind.config.js"**          | The configuration file that should be used when none is specified                                                                       |

This config would look something like
```js
module.exports = {
  plugins: [
    require('postcss-multiple-tailwind')({ mode: 'auto', defaultConfig: 'my-app-styles.config.js' }),
    require('autoprefixer')
  ]
}
``` 
## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/robbevp/postcss-multiple-tailwind. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

