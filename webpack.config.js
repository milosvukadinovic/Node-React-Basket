const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    watch: true,
    mode: 'development',
    output: {
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
  exclude: /node_modules/,
  use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    output: {
        filename: 'js/bundle.js',
        path: `${__dirname}/www`,
        publicPath: '/',
    }
};