const logger = require('../utils/logger');
const { resolveThrough, rejectThrough, through, silent } = require('fun-util');
const { uri } = require('../utils/url');

const logIncomingRequest = ({ method, url, body }) => {
  logger.info('received client request -', uri({ method, url }));
  logger.debug('with body:', body);
};

const logIncomingResponse = ({ method, url }, { statusCode }, data) => {
  logger.info('responding to client -', statusCode, uri({ method, url }));
  logger.debug('with body:', data);
};

const logRequest = ({ headers, data, method, url }) => {
  const body = silent(JSON.parse)(data);
  logger.info('sending request -', uri({ method, url }));
  logger.debug('with body:', { headers, body });
};

const logResponse = ({ config, data, method, url, status }) => {
  logger.info('received response -', status, uri(config));
  logger.debug('with body:', data);
};

const logOutgoingRequest = ({ ajax }) => {
  ajax.interceptors.request.use(
    through(logRequest));
};

const logOutgoingResponse = ({ ajax }) => {
  ajax.interceptors.response.use(
    resolveThrough(logResponse),
    rejectThrough(silent(logResponse)));
};

module.exports = (request, response, next) => {
  logIncomingRequest(request);
  logOutgoingRequest(request);
  logOutgoingResponse(request);
  next(data => {
    logIncomingResponse(request, response, data);
    response.send(data);
  });
};
