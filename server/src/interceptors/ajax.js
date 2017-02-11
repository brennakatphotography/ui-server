const makeHeaders = require('../utils/makeHeaders');
const { map, through } = require('fun-util');
const axios = require('axios');

const ajaxDo = (instance, method, ...args) => {
  return instance[method](...args)
    .then(({ data }) => data)
    .catch(({ data, status }) => Promise.reject({ ...data, status }));
};

const mapMethods = instance => {
  return map({ delete: '', get: '', post: '', put: '' }, (_, method) => {
    return (...args) => ajaxDo(instance, method, ...args);
  });
};

const createInstance = ({ token: Authorization }) => {
  const instance = axios.create(makeHeaders({ Authorization }));
  return { ...instance, ...mapMethods(instance) };
};

module.exports = (request, response, next) => {
  request.ajax = createInstance(request.cookies);
  next();
};
