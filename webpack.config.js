'use strict'
const path = require('path');

let plugins = [];
// if production
// const webpack = require('webpack');
// plugins = [
//   new webpack.optimize.UglifyJsPlugin(),
//   new webpack.optimize.OccurrenceOrderPlugin(),
//   new webpack.optimize.DedupePlugin()
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
