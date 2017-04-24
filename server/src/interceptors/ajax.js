const makeHeaders = require('../utils/makeHeaders');
const { map, through, type } = require('fun-util');
const axios = require('axios');

const METHODS = { delete: '', get: '', patch: '', post: '', put: '', options: '' };

const ajaxDo = (instance, method, ...args) => {
  return instance[method](...args)
    .then(({ data }) => data)
    .catch(({ data, status }) => {
      if (type(data) === 'string') {
        return Promise.reject({ message: data.trim(), status });
      }
      return Promise.reject({ ...data, status });
    });
};

const mapMethods = instance => {
  return map(METHODS, (_, method) => {
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
