const { buildQueryString } = require('../../utils/url');
const route = require('express').Router();
const { PHOTO_API } = process.env;

const forward = method => ({ ajax, baseUrl, body, path, query }, response, next) => {
  const queryString = buildQueryString(query);
  ajax[method](`${PHOTO_API}${baseUrl}${path}${queryString}`, body)
    .then(data => response.status(200).json(data))
    .catch(next);
};

route.delete('/*', forward('delete'));

route.get('/*', forward('get'));

route.options('/*', forward('options'));

route.patch('/*', forward('patch'));

route.post('/*', forward('post'));

route.put('/*', forward('put'));

module.exports = route;
