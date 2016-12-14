const route = require('express').Router();
const { buildQueryString } = require('../utils/url');
const { PHOTO_API } = process.env;

route.get('/login', ({ headers: { host } }, response, next) => {
  let query = buildQueryString({
    redirect_host: host,
    redirect_path: '/auth/callback'
  });
  response.redirect(`${PHOTO_API}/auth/login${query}`)
});

route.get('/callback', ({ query: { token } }, response, next) => {
  response.cookie('token', token, { httpOnly: true });
  response.redirect('/');
});

module.exports = route;
