const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const ROOT = path.resolve(__dirname, '.');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [ROOT].concat(args));
}

var entries = {
    'browser': ['./src/browser/bootstrap.ts', './src/browser/bootstrap.html'],
    'desktop': './src/desktop/bootstrap.ts',
};

var options = {

    target: 'electron-renderer',

    cache: false,
    devtool: 'cheap-module-source-map',

    entry: entries,

    // @TODO false for electron and true for node-notifier >_<

    node: {
        __dirname: false,
        __filename: false
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [root('src'), root('node_modules')],
    },

    module: {

        rules: [

            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
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
                        'css-loader?sourceMap&modules&camelCase&localIdentName=[local]',
                        'sass-loader?sourceMap'
                    ])

                ]
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            }

        ],

    },

    plugins: [

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

        new WebpackNotifierPlugin(),

    ],

    externals: {
        'electron': 'require("electron")',
        'net': 'require("net")',
        'remote': 'require("remote")',
        'shell': 'require("shell")',
        'app': 'require("app")',
        'ipc': 'require("ipc")',
        'fs': 'require("fs")',
        'buffer': 'require("buffer")',
        'system': '{}',
        'file': '{}'
    },

    output: {

        path: root('build'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js',
        libraryTarget: 'var'

    }

};

function ONLY_DESKTOP(options){

    delete entries.browser;

    return Object.assign(options, {
        entry: entries,
        node: {
            __dirname: false,
            __filename: false
        }
    });

}

function ONLY_BROWSER(options){

    delete entries.desktop;

    return Object.assign(options, {
        entry: entries,
        node: {
            __dirname: true,
            __filename: true
        }
    });

}

switch(process.env.BUILD_OPTION){

    case 'ONLY_DESKTOP': module.exports = ONLY_DESKTOP(options); break;
    case 'ONLY_BROWSER': module.exports = ONLY_BROWSER(options); break;

    default: module.exports = options; break;

}

