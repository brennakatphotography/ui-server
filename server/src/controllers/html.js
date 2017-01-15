const path = require('path');
const route = require('express').Router();
const ENV = require('../config/env');
const DEV_ENV = { ...ENV, ...require('../config/dev.env') };
const PROD_ENV = { ...ENV, ...require('../config/prod.env') };

route.get('/*', (request, response, next) => {
  const INDEX_JADE = path.join(__dirname, '../../../client/dist/index.jade');
  let env = PROD_ENV;
  if (process.env.GULP) {
    env = DEV_ENV;
  }
  response.render(INDEX_JADE, { env, json: JSON.stringify(env) });
});

module.exports = route;
