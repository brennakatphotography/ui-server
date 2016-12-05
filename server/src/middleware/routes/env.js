const path = require('path');
const route = require('express').Router();

const [DEV_HTML, INDEX_HTML] = ['dev', 'index'].map(file => {
  return path.join(__dirname, `../../../../client/dist/${file}.html`);
});
const { GULP } = process.env;

route.get('/*', (request, response, next) => {
  if (GULP) {
    response.sendFile(DEV_HTML);
  } else {
    response.sendFile(INDEX_HTML);
  }
});

module.exports = route;
