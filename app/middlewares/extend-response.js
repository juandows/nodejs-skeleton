const errors = require('../helpers/errors');

module.exports = (request, response, next) => {
  response.boom = (boomError) => {
    const returnedJson = boomError.output.payload;
    if (boomError.data) {
      returnedJson.data = boomError.data;
    }
    response.status(boomError.output.statusCode).json(returnedJson);
  };
  // .sendError to set the status and send a json error
  response.sendError = (error, data) => {
    const httpError = {
      status: error.status || errors.internalServerError.status,
      code: error.code || errors.internalServerError.code,
      message: error.message || errors.internalServerError.message,
    };
    if (data !== undefined) {
      httpError.data = data;
    }
    response.status(httpError.status).json({ error: httpError });
  };
  response.app.locals.serverBaseURL = request.headers['x-forwarded-server'] || `${request.protocol}://${request.get('host')}`;
  next();
};
