const schemaValidation = require('../helpers/schema-validation');
const bodyParser = require('body-parser');
const errors = require('../helpers/errors');

const checkContentTypeHeader = (request, response, next) => {
  if (!('content-type' in request.headers) || !request.headers['content-type'].includes('application/json')) {
    response.sendError(errors.missingHeaderContentType);
  } else {
    next();
  }
};

const bodyParserError = (error, request, response, next) => {
  response.sendError(errors.requestBodySyntaxError);
};

const validateSchema = schemaName => (request, response, next) => {
  if (!schemaValidation.validate(schemaName, request.body)) {
    response.sendError(errors.requestBodyValidationError, schemaValidation.errors);
  } else {
    next();
  }
};

module.exports = schemaName => [
  checkContentTypeHeader, bodyParser.json(), bodyParserError, validateSchema(schemaName),
];
