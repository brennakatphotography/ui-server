const axios = require('axios');

const call = (method, ...args) => {
  return axios[method](...args)
    .then(({ data }) => data)
    .catch(({ data, status }) => Promise.reject({ ...data, status }));
};

module.exports = {
  delete: call.bind(null, 'delete'),
  get: call.bind(null, 'get'),
  post: call.bind(null, 'post'),
  put: call.bind(null, 'put')
}
