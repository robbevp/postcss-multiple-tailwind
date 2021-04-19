const postcss = require("postcss");
const path = require("path");
const fs = require("fs");

const plugin = require("..");

async function run(inputFile, output, opts) {
  const file = path.join(__dirname, "fixtures", inputFile);
  const css = fs.readFileSync(file);
  let result = await postcss([plugin(opts)]).process(css, { from: file });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

/* Manual mode */
it("should not transform if @multiple-tailwind is not present in default mode", async () => {
  await run(
    "manual-do nothing.css",
    "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n"
  );
});

it("should use default config if no param in default mode", async () => {
  await run("manual-default.css", "body {\n  color: #default;\n}");
});

it("should use specified config if present in default mode", async () => {
  await run("manual-param.css", "body {\n  color: #test;\n}");
});

it("should use specific default config if given in opts in manual mode", async () => {
  await run("manual-default.css", "body {\n  color: #test;\n}", {
    defaultConfig: "test.config.js",
  });
});

/* Auto mode */

it("should use default config if no declaration in auto mode", async () => {
  await run("auto-default.css", "body {\n  color: #default;\n}", {
    mode: "auto",
  });
});

it("should use specified config if present in auto mode", async () => {
  await run("auto-param.css", "body {\n  color: #test;\n}", { mode: "auto" });
});

it("should use specific default config if given in opts in auto mode", async () => {
  await run("auto-default.css", "body {\n  color: #test;\n}", {
    mode: "auto",
    defaultConfig: "test.config.js",
  });
});

/* Errors */

it("should throw error if config does not exist", async () => {
  const file = path.join(__dirname, "fixtures", "error-false config.css");
  const css = fs.readFileSync(file);
  await expect(
    postcss([plugin()]).process(css, { from: file })
  ).rejects.toThrow(
    expect.objectContaining({
      message: `Cannot find config file '${__dirname}/fixtures/undefined.config.js'`,
    })
  );
});

it("should throw error if config from opts does not exist", async () => {
  const file = path.join(__dirname, "fixtures", "manual-default.css");
  const css = fs.readFileSync(file);
  await expect(
    postcss([plugin({ defaultConfig: "undefined.config.js" })]).process(css, {
      from: file,
    })
  ).rejects.toThrow(
    expect.objectContaining({
      message: `Cannot find config file '${__dirname}/fixtures/undefined.config.js'`,
    })
  );
});

it('should throw error if "@multiple-tailwind" is present multiple times', async () => {
  const file = path.join(
    __dirname,
    "fixtures",
    "error-multiple declarations.css"
  );
  const css = fs.readFileSync(file);
  await expect(
    postcss([plugin()]).process(css, { from: file })
  ).rejects.toThrow(
    expect.objectContaining({
      message: `You registered '@multiple-tailwind' more than once in '${__dirname}/fixtures/error-multiple declarations.css'`,
    })
  );
});
