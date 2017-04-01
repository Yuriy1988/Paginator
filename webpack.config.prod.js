var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var cssnano = require('cssnano');
var precss = require('precss');
var syntax = require('postcss-scss');
var Visualizer  = require('webpack-visualizer-plugin');
var path = require('path');

module.exports = {

  entry: {
    app: [
      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
      'react-motion',
      'react-router-scroll',
      'react-sticky',
    ]
  },

  output: {
    path: __dirname + '/dist/',
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
    alias: {
     'mixpanel': path.resolve('./client/util/mixpanel')
    }
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1!postcss-loader'),
      }, {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      }, {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel',
      }, {
        test: /\.(jpe?g|gif|png|svg)$/i, loader: 'url-loader?limit=9999999999999&mimetype=image/png',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        IS_MOBILE: false,
        IS_NATIVE: false,
      },
      ENV: 'production',
      IS_MOBILE: false,
      IS_NATIVE: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new ExtractTextPlugin('app.[chunkhash].css', { allChunks: true }),
    new ManifestPlugin({
      basePath: '/',
    }),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest",
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new Visualizer(),
    new webpack.ProvidePlugin({
      'mixpanel': 'mixpanel'
    }),
  ],
  postcss: () => ({
    plugins: [
      precss(),
      postcssFocus(),
      cssnext({
        browsers: ['last 2 versions', 'IE > 10'],
      }),
      cssnano({
        autoprefixer: false
      }),
      postcssReporter({
        clearMessages: true,
      }),
    ],
    syntax: syntax,
  }),
};
