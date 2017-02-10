const { unlink } = require('fs');
const route = require('express').Router();
const { streamFile, sendFile } = require('../../../utils/file');
const { buildQueryString } = require('../../../utils/url');

route.get('/:id', ({ cookies, params, query, schema }, response, next) => {
  let url = `/bin/v1/photos/${params.id}${buildQueryString(query)}`;
  streamFile(url, cookies.token)
    .then(sendFile(response))
    .then(unlink)
    .catch(next);
});

module.exports = route;
