const addHeaders = require('../../utils/addHeaders');
const axios = require('axios');

const ajax = (axios, method, ...args) => {
  return axios[method](...args)
    .then(({ data }) => data)
    .catch(({ data, status }) => Promise.reject({ ...data, status }));
};

const createInstance = ({ token }) => {
  const instance = axios.create({ headers: addHeaders(token) });
  return ['delete', 'get', 'post', 'put'].reduce((object, method) => {
    return {
      ...object,
      [method]: (...args) => ajax(instance, method, ...args)
    };
  }, {});
};

module.exports = (request, response, next) => {
  request.ajax = createInstance(request.cookies);
  next();
};
