const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['./src/js/main.js'],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    devtool: "source-map",
    module:{
        rules:[
            { 
                test: /\.js$/, 
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    mode: 'development'
};