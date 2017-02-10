const { map, filter, identity } = require('fun-util');

const Authorization = (token = process.env.API_TOKEN) => {
  let header = `Bearer ${token || ''}`;
  if (header.length > 7) {
    return header;
  }
};

const headerMappers = { Authorization };

const mapHeader = (header, key) => {
  const mapper = headerMappers[key] || identity;
  return mapper(header);
};

const makeHeaders = (headers = {}) => {
  let newHeaders = map(headers, mapHeader);
  return {
    headers: filter(newHeaders, header => header !== undefined)
  };
};

module.exports = makeHeaders;
