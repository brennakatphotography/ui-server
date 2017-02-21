const route = require('express').Router();
const request = require('request');
const { buildQueryString } = require('../../../utils/url');
const { PHOTO_API } = process.env;
const makeHeaders = require('../../../utils/makeHeaders');

route.get('/:id', ({ cookies, params, query, schema }, response, next) => {
  const { token: Authorization } = cookies;
  const url = `${PHOTO_API}/bin/v1/photos/${params.id}${buildQueryString(query)}`;
  request(url, makeHeaders({ Authorization }))
    .pipe(response);
});

module.exports = route;
