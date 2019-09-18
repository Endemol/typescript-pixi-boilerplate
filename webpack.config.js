var path = require('path');

module.exports = {
    entry: './source/ts/App.ts',
    output: {
        filename: 'js/App.js'
    },
    resolve: {
        modules: [path.resolve(__dirname, "source/ts"), "node_modules"],
        extensions: ['.ts', '.js'],
        alias: {
            'pixi.js' : 'pixi.js/lib/index.js'
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ],
        noParse: [ /.*(pixi-particles\.js).*/ ]
    },
    watch: false
};
