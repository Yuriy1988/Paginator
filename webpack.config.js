var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: [
      './Paginator/index.js',
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'react-redux-paginator'
  },

  resolve: {
    extensions: ['.js'],
    modules: [
      'client',
      'node_modules',
    ]
  }
};
