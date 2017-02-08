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
