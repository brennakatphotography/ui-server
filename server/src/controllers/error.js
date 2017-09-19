const logger = require('../utils/logger');

module.exports = (error, request, response, next) => {
  logger.error('An error was not caught:', error);
  response.status(error.status || 500)
    .json({
      message: error.message || 'An unknown error ocurred'
    });
};
