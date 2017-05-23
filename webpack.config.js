var webpack = require('webpack');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var Visualizer  = require('webpack-visualizer-plugin');
var path = require('path');

module.exports = {
  entry: {
    app: [
      './Paginator/index.js',
    ]
  },

  output: {
    path: __dirname + '/lib/',
    filename: '[name].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js'],
    modules: [
      'client',
      'node_modules',
    ]
  }
};
