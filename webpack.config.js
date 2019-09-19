var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './source/ts/App.ts',
    output: {
        filename: 'js/App.js'
    },
    resolve: {
        modules: [path.resolve(__dirname, "source/ts"), "node_modules"],
        extensions: ['.ts', '.js'],
        alias: {
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ],
        noParse: [ /.*(pixi-particles\.js).*/ ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
        })
    ],
    watch: false
};
