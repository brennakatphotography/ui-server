const { reduce, truncate } = require('fun-util');

const buildQueryString = query => {
  if (!query) return '';
  let string = reduce(query, (string, value, key) => {
    return `${string}${key}=${value}&`
  }, '?');
  return truncate(string);
};

module.exports = {
  buildQueryString
};
