const { unlink } = require('fs');
const route = require('express').Router();
const { streamFile, sendFile } = require('../../../utils/file');

route.get('/:id', (request, response, next) => {
  streamFile('/bin/v1/photos/', request.params.id)
    .then(sendFile(response))
    .then(unlink)
    .catch(next);
});

module.exports = route;
