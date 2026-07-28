"use strict";

var path = require("path");
var WebpackNotifierPlugin = require("webpack-notifier");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
    entry: "./Scripts/src/index.js",
    output: {
        path: path.resolve(__dirname, "./wwwroot/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env',
                        '@babel/react', {
                            'plugins': ['@babel/plugin-proposal-class-properties']
                        }]
                }
            },
            {
                test: /\.(css|less)$/,
                use: ["style-loader", "css-loader"]
            }
        ],
    },
    devtool: "inline-source-map",
    plugins: [new WebpackNotifierPlugin(), new BrowserSyncPlugin()]
};