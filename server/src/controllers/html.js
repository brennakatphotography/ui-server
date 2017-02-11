const path = require('path');
const route = require('express').Router();
const ENV = require('../config/env');
const DEV_ENV = { ...ENV, ...require('../config/dev.env') };
const PROD_ENV = { ...ENV, ...require('../config/prod.env') };
const { CLIENT_FOLDER, GULP } = process.env;

route.get('/*', (request, response, next) => {
  const INDEX_JADE = path.join(__dirname, '../../../', CLIENT_FOLDER, 'index.jade');
  const env = GULP ? DEV_ENV : PROD_ENV;
  response.render(INDEX_JADE, { env, json: JSON.stringify(env) });
});

module.exports = route;
