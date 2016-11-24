const { unlink } = require('fs');
const route = require('express').Router();
const { streamFile, sendFile } = require('../../../utils/file');
const { buildQueryString } = require('../../../utils/url');

route.get('/:id', ({ params, query, schema }, response, next) => {
  streamFile(`/bin/v1/photos/${params.id}${buildQueryString(query)}`)
    .then(sendFile(response))
    .then(unlink)
    .catch(next);
});

module.exports = route;
