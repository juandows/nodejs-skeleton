const fs = require('fs');
const path = require('path');
const validation = require('ajv')({
  allErrors: true,
  useDefaults: true,
});

const listDir = dir => fs.readdirSync(dir).map(entry => `${dir}/${entry}`);

const loadFile = (file) => {
  if (path.extname(file) === '.json') {
    const schema = JSON.parse(fs.readFileSync(file));
    validation.apiSchemas = validation.apiSchemas || {};
    validation.apiSchemas[schema.id] = schema;
    validation.addSchema(schema);
  }
};

const loadDir = dir => listDir(dir).forEach(entry => (fs.statSync(entry).isFile() ? loadFile(entry) : loadDir(entry)));

const schemasDir = fs.realpathSync(`${__dirname}/../schemas`);
loadDir(schemasDir);

module.exports = validation;
