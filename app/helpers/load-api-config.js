const fs = require('fs');
const util = require('util');
const validation = require('./schema-validation');

function loadApiConfigFile(filename) {
  const config = JSON.parse(fs.readFileSync(filename));
  if (!validation.validate('api-config', config)) {
    throw new Error(`validation error in config file '${filename}': ${util.inspect(validation.errors)}`);
  }
  if (config.mongodb.ssl) {
    try {
      config.mongodb.sslCert = fs.readFileSync(config.mongodb.sslCert);
      config.mongodb.sslKey = fs.readFileSync(config.mongodb.sslKey);
      config.mongodb.sslCA = config.mongodb.sslCA.map(caFilename => fs.readFileSync(caFilename));
    } catch (error) {
      throw new Error(`error in config file '${filename}': ${error.message}`);
    }
  }
  return config;
}

module.exports = loadApiConfigFile;
