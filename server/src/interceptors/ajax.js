const makeHeaders = require('../utils/makeHeaders');
const { map, resolveThrough, rejectThrough, through } = require('fun-util');
const axios = require('axios');

const uri = ({ method, url }) => `${method.toUpperCase()}: ${url}`;

const logRequest = ({ headers, data, method, url }) => {
  const body = data ? JSON.parse(data) : undefined;
  const message = JSON.stringify({ headers, body });
  console.info('sending request -', uri({ method, url }), message);
};

const logResponse = logger => ({ config, data, status }) => {
  logger('received response -', status, uri(config), JSON.stringify(data));
};

const ajaxDo = (instance, method, ...args) => {
  return instance[method](...args)
    .then(({ data }) => data)
    .catch(({ data, status }) => Promise.reject({ ...data, status }));
};

const mapMethods = instance => {
  const methods = { delete: null, get: null, post: null, put: null };
  return map(methods, (_, method) => {
    return (...args) => ajaxDo(instance, method, ...args);
  });
};

const createInstance = ({ token: Authorization }) => {
  const instance = axios.create(makeHeaders({ Authorization }));
  instance.interceptors.request.use(through(logRequest));
  instance.interceptors.response.use(
    resolveThrough(logResponse(console.info)),
    rejectThrough(logResponse(console.warn))
  );
  return mapMethods(instance);
};

module.exports = (request, response, next) => {
  request.ajax = createInstance(request.cookies);
  next();
};
