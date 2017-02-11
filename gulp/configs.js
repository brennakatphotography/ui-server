const babelifyConfig = {
  presets: ['es2015', 'stage-1'],
  ignore: 'node_modules'
};

const browserSyncConfig = {
  server: false
};

module.exports = {
  babelifyConfig,
  browserSyncConfig
};
