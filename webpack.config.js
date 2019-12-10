const path = require('path');
const { plugin: BundleDTSPlugin } = require('bundle-dts');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    devtool: "source-map",
    module: {
        rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
    },
    resolve: {
        extensions: ['.ts']
    },
    plugins: [
        new BundleDTSPlugin()
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname),
        libraryTarget: 'commonjs'
    }
};