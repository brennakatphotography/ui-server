const { buildQueryString } = require('../../utils/url');
const route = require('express').Router();
const { PHOTO_API } = process.env;

route.get('/*', ({ ajax, baseUrl, path, query }, response, next) => {
  const queryString = buildQueryString(query);
  ajax.get(`${PHOTO_API}${baseUrl}${path}${queryString}`)
    .then(data => response.status(200).json(data))
    .catch(next);
});

module.exports = route;
