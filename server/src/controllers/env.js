const { filter, map, reduce, silent, thread } = require('fun-util');

const CLIENT_PREFIX = 'CLIENT--';

const filterEnv = env => {
  return filter(env, (_, key) => key.match(new RegExp(`^${CLIENT_PREFIX}.+`)));
};

const mapEnv = env => map(env, silent(JSON.parse));

const reduceEnv = env => {
  return reduce(env, (env, value, key) => ({
    ...env,
    [key.replace(CLIENT_PREFIX, '')]: value
  }), {});
};

const getEnv = thread(filterEnv, mapEnv, reduceEnv);

const ENV = JSON.stringify(getEnv(process.env));

module.exports = (request, response, next) => {
  response
    .set('Content-Type', 'text/javascript')
    .send(`window.getEnv = function() { return ${ENV}; };`);
};
