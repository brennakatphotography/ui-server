const { reduce, truncate, thread } = require('fun-util');

const buildQueryString = (query = {}) => {
  return reduce(query, (string, value, key) => {
    return `${string}${key}=${value}&`;
  }, '?');
};

module.exports = {
  buildQueryString: thread(buildQueryString, truncate)
};
