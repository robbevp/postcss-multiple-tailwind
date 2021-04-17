# PostCSS Multiple Tailwindcss

[PostCSS](https://github.com/postcss/postcss) plugin to process multiple tailwindcss configs easily.


The following will process tailwind with a tailwind.config.js in the same directory as the input file.

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
## Usage

**Step 1:** Install plugin:

```sh
yarn install -D postcss-multiple-tailwindcss
```
Note that you also should have postcss and tailwindcss installed.


**Step 2:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
-   require('tailwindcss'),
+   require('postcss-multiple-tailwindcss'),
    require('autoprefixer')
  ]
}
```

**Step 3:** Add `@multiple-tailwind;` to your input files.

```css
@multiple-tailwind;
@tailwind base;
@tailwind components;
@tailwind utilities;
```

You can also provide a different filename:

```css
@multiple-tailwind tailwind-admin.config.js;
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Warning

This project is still in an early stage, before version 1.0.0 is reached, there might be breaking changes with minor versions.  

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/robbevp/postcss-multiple-tailwindcss. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

