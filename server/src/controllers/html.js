const path = require('path');
const route = require('express').Router();
const ENV = require('../config/env');
const DEV_ENV = { ...ENV, ...require('../config/dev.env') };
const PROD_ENV = { ...ENV, ...require('../config/prod.env') };

route.get('/*', (request, response, next) => {
  const INDEX_JADE = path.join(__dirname, '../../../client/build/index.jade');
  const env = process.env.GULP ? DEV_ENV : PROD_ENV;
  response.render(INDEX_JADE, { env, json: JSON.stringify(env) });
});

module.exports = route;
