const { getArg } = require('./utils');

const babelifyConfig = {
  presets: ['es2015', 'react', 'stage-1'],
  ignore: 'node_modules/*[^fun-util]'
};

const browserifyConfig = {
  extensions: ['.jsx', '.js'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true,
  entries: './client/src/js/app.js'
};

const browserSyncConfig = {
  server: false
};

module.exports = {
  babelifyConfig,
  browserifyConfig,
  browserSyncConfig
};
