const route = require('express').Router();
const { buildQueryString } = require('../utils/url');
const { PHOTO_API } = process.env;
const REDIRECT_PATH = '/auth/callback';

route.get('/login', ({ headers: { host }, protocol }, response, next) => {
  let redirect_uri = `${protocol}://${host}${REDIRECT_PATH}`;
  let query = buildQueryString({ redirect_uri });
  response.redirect(`${PHOTO_API}/auth/login${query}`);
});

route.get('/callback', ({ query: { token } }, response, next) => {
  response.cookie('token', token, { httpOnly: true });
  response.redirect('/');
});

module.exports = route;
