'use strict';

var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var additionalPaths = [];
var srcPath = path.join(__dirname);
var defaultSettings = {
    srcPath: srcPath,
    publicPath: __dirname + '/dist/'
};

module.exports = {
    devtool: 'eval',
    entry: {
        c3: [
            path.join(__dirname, 'node_modules/d3/d3.js'),
            path.join(__dirname, './index.js'),
            path.join(__dirname, './c3.css')
        ]
    },
    output: {
        filename: 'c3.js',
        path: defaultSettings.publicPath
    },
    resolve: {
        alias: {
            "topojson": path.join(__dirname, "node_modules/topojson/build/topojson.js")
        },
        modules: [
            path.resolve(__dirname, "./"),
            "node_modules"
        ]
    },
    resolveLoader: {

    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
          }
        ],
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    plugins: [
        new ExtractTextPlugin("c3.css")
    ]
};