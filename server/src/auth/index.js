const route = require('express').Router();
const { buildQueryString } = require('../utils/url');
const { PHOTO_API } = process.env;

route.get('/login', ({ headers: { host }, protocol }, response, next) => {
  let redirect_uri = `${protocol}://${host}/auth/callback`;
  let query = buildQueryString({ redirect_uri });
  response.redirect(`${PHOTO_API}/auth/login${query}`);
});

route.get('/logout', (request, response, next) => {
  response.clearCookie('token', { httpOnly: true });
  response.redirect('/');
});

route.get('/callback', ({ query: { token } }, response, next) => {
  response.cookie('token', token, { httpOnly: true });
  response.redirect('/');
});

module.exports = route;
