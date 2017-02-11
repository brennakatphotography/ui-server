const { resolveThrough, rejectThrough, through, silent } = require('fun-util');
const { uri } = require('../utils/url');

const logClientRequest = logger => ({ method, url }) => {
  logger('client requested -', uri({ method, url }));
};

const logRequest = logger => ({ headers, data, method, url }) => {
  const body = silent(JSON.parse)(data);
  const message = JSON.stringify({ headers, body });
  logger('sending request -', uri({ method, url }), message);
};

const logResponse = logger => ({ config, data, method, url, status }) => {
  logger('received response -', status, uri(config), JSON.stringify(data));
};

const logInboundRequest = logClientRequest(console.info);

const logOutboundRequest = ({ ajax }) => {
  ajax.interceptors.request.use(
    through(logRequest(console.info)));
};

const logOutboundRequestResult = ({ ajax }) => {
  ajax.interceptors.response.use(
    resolveThrough(logResponse(console.info)),
    rejectThrough(silent(logResponse(console.warn))));
};

module.exports = (request, response, next) => {
  logInboundRequest(request);
  logOutboundRequest(request);
  logOutboundRequestResult(request);
  next();
};
