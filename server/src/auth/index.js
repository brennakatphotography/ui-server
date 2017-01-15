const route = require('express').Router();
const { buildQueryString } = require('../utils/url');
const { PHOTO_API } = process.env;
const redirect_path = '/auth/callback';

route.get('/login', ({ headers: { host: redirect_host } }, response, next) => {
  let query = buildQueryString({ redirect_host, redirect_path });
  response.redirect(`${PHOTO_API}/auth/login${query}`);
});

route.get('/callback', ({ query: { token } }, response, next) => {
  response.cookie('token', token, { httpOnly: true });
  response.redirect('/');
});

module.exports = route;
