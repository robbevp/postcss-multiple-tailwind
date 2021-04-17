# PostCSS-Multiple-Tailwindcss

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

This allows you to have a different theme for the two css files, or have different purge settings for both.
## Usage

**Step 1:** Install plugin:

```sh
yarn add -D postcss-multiple-tailwindcss
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

Postcss-multiple-tailwindcss will insert tailwindcss into the postcss process with the `tailwind.config.js` in the same folder as the input file.  


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

