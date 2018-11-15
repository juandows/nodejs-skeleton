const logger = require('winston');
const errors = require('../helpers/errors');

module.exports = (error, request, response, next) => {
  logger.error(`${request.originalUrl}: ${error.message}`);
  if (error.status !== undefined && error.code !== undefined && error.message !== undefined) {
    response.sendError(error);
  } else {
    if (error.name === 'MongoError') {
      const messageWords = error.message.toLowerCase().split(' ');

      // after a connection fails all its tries to reconnect it is still resolved but it will never reconnect again,
      // and other parts of the driver (cursors, etc) will fail forever with 'Topology was destroyed'
      if (messageWords.includes('topology') && messageWords.includes('destroyed')) {
        response.app.locals.database.connection = undefined;
      }
    }
    response.sendError(errors.internalServerError, error);
  }
};
