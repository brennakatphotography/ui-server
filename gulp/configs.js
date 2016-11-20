const { getArg } = require('./utils');

const babelifyConfig = {
  presets: ['es2015', 'react', 'stage-1'],
  ignore: 'node_modules'
};

const browserifyConfig = {
  extensions: ['.jsx', '.js'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true,
  entries: './src/js/app.js'
};

const browserSyncConfig = {
  server: './public',
  port: getArg('port') || 8080
};

module.exports = {
  babelifyConfig,
  browserifyConfig,
  browserSyncConfig
};
