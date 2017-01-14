const helpers               = require('./webpack.helpers');
const webpack               = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin     = require('html-webpack-plugin');

module.exports = {

    entry: {
        'browser': ['./src/browser/bootstrap.ts', './src/browser/bootstrap.html']
    },

    resolve: {
        extensions: ['.js', '.ts'],
        modules: [
            helpers.root('./src/browser'),
            helpers.root('./node_modules')
        ],
    },

    cache: true,

    target: "electron-renderer",
    devtool: 'inline-eval-cheap-source-map',

    node: {
        __dirname: true,
        __filename: true
    },

    module: {

        rules: [

            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ],
                // @TODO exclude: [/\.(spec|e2e)\.ts$/]
            },

            {
                test: /\.html$/,
                use: [
                    'html-loader',
                ],
            },

            {
                test: /\.(css|sass|scss)$/,
                use: [

                    {
                        loader: 'style-loader'
                    },

                    ExtractTextPlugin.extract([
                        'raw-loader',
                        'sass-loader?sourceMap'
                    ])

                ]
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8000&name=[path][name].[ext]'
            }

        ],

    },

    plugins: [

        new WebpackNotifierPlugin({
            title: 'DataCat Browser',
            alwaysNotify: false,
            skipFirstNotification: false
        }),

        new webpack.DllReferencePlugin({
            context: helpers.root('.'),
            manifest: require(helpers.root('build/dll/vendor-manifest.json'))
        }),

        new ExtractTextPlugin({
            filename: 'browser.css',
            disable: false,
            allChunks: true
        }),

        new HtmlWebpackPlugin({
            template: "./src/browser/bootstrap.html",
            filename: "bootstrap.html",
            excludeChunks: ['desktop']
        }),

        /**
         * Fix "Critical Dependency" for Webpack
         * https://github.com/AngularClass/angular2-webpack-starter/issues/993#issuecomment-246883410
         */

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),

    ],

    watchOptions: {
        aggregateTimeout: 2000,
        poll: 1500,
    },

    output: {

        path: helpers.root('build'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js',
        libraryTarget: 'var'

    }

};
