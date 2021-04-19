const postcss = require("postcss");
const path = require("path");
const fs = require("fs");

const plugin = require("..");

const DEFAULT_CONFIG_OUTPUT = "body {\n  color: #default;\n}";
const TEST_CONFIG_OUTPUT = "body {\n  color: #test;\n}";

async function run(inputFile, output, opts) {
  const file = path.join(__dirname, "fixtures", inputFile);
  const css = fs.readFileSync(file);
  let result = await postcss([plugin(opts)]).process(css, { from: file });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

async function error(inputFile, error, opts) {
  const file = path.join(__dirname, "fixtures", inputFile);
  const css = fs.readFileSync(file);
  await expect(
    postcss([plugin(opts)]).process(css, { from: file })
  ).rejects.toThrow(
    expect.objectContaining({
      message: error,
    })
  );
}

/* Manual mode */

it("should not transform if @multiple-tailwind is not present in default mode", async () => {
  await run(
    "manual-do nothing.css",
    "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n"
  );
});

it("should use default config if no param in default mode", async () => {
  await run("manual-default.css", DEFAULT_CONFIG_OUTPUT);
});

it("should use specified config if present in default mode", async () => {
  await run("manual-param.css", TEST_CONFIG_OUTPUT);
});

it("should use specific default config if given in opts in manual mode", async () => {
  await run("manual-default.css", TEST_CONFIG_OUTPUT, {
    defaultConfig: "test.config.js",
  });
});

/* Auto mode */

it("should use default config if no declaration in auto mode", async () => {
  await run("auto-default.css", DEFAULT_CONFIG_OUTPUT, {
    mode: "auto",
  });
});

it("should use specified config if present in auto mode", async () => {
  await run("auto-param.css", TEST_CONFIG_OUTPUT, { mode: "auto" });
});

it("should use specific default config if given in opts in auto mode", async () => {
  await run("auto-default.css", TEST_CONFIG_OUTPUT, {
    mode: "auto",
    defaultConfig: "test.config.js",
  });
});

/* Errors */

it("should throw error if config does not exist", async () => {
  await error(
    "error-false config.css",
    `Cannot find config file '${__dirname}/fixtures/undefined.config.js'`
  );
});

it("should throw error if config from opts does not exist", async () => {
  await error(
    "manual-default.css",
    `Cannot find config file '${__dirname}/fixtures/undefined.config.js'`,
    { defaultConfig: "undefined.config.js" }
  );
});

it('should throw error if "@multiple-tailwind" is present multiple times', async () => {
  await error(
    "error-multiple declarations.css",
    `You registered '@multiple-tailwind' more than once in '${__dirname}/fixtures/error-multiple declarations.css'`
  );
});
