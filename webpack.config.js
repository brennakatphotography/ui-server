'use strict'
const path = require('path');

let plugins = [];
// if production
// const {
//   UglifyJsPlugin, OccurrenceOrderPlugin, DedupePlugin
// } = require('webpack').optimize;
// plugins = [
//   new UglifyJsPlugin,
//   new OccurrenceOrderPlugin,
//   new DedupePlugin
// ];

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'app.js'
  },
  plugins,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname
    }]
  }
};
