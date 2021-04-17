const postcss = require('postcss');
const path = require('path');
const fs = require('fs');

const plugin = require('..')

async function run(inputFile, output) {
  const file = path.join(__dirname, 'fixtures', inputFile);
  const css = fs.readFileSync(file);
  let result = await postcss([plugin]).process(css, { from: file })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

/* Write tests here */
it('should not transform if @multiple-tailwind is not present', async () => {
  await run('do nothing.css', "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n")
});

it('should use default config if no param', async () => {
  await run('with default.css', "body {\n  color: #default;\n}")
});

it('should use specified config if present', async () => {
  await run('with param.css', "body {\n  color: #test;\n}")
});

it('should throw error if config does not exist', async () => {
  const file = path.join(__dirname, 'fixtures', 'with false config.css');
  const css = fs.readFileSync(file);
  await expect(postcss([plugin]).process(css, { from: file })).rejects.toThrow(
    expect.objectContaining({ message: `Cannot find config file '${__dirname}/fixtures/undefined.config.js'` }),
  )
});