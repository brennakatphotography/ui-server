const { buildQueryString } = require('../../utils/url');
const route = require('express').Router();
const { PHOTO_API } = process.env;

route.get('/*', (request, response, next) => {
  const queryString = buildQueryString(request.query);
  request.ajax.get(`${PHOTO_API}${request.baseUrl}${request.path}${queryString}`)
    .then(data => response.status(200).json(data))
    .catch(next);
});

module.exports = route;
