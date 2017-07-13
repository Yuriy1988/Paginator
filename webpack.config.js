var webpack = require('webpack');
var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
        path: __dirname + '/lib/',
        filename: 'index.js',
        publicPath: '/',
    },

    resolve: {
        extensions: ['.js'],
        modules: [
            'client',
            'node_modules',
        ]
    }
    ,plugins: [
        new UglifyJSPlugin()
    ]
};