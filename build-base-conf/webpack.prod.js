const path = require('path')
const webpack = require('webpack')
const webpackCommon = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')
const { module } = require('./webpack.dev')

module.exports = smart(webpackCommon, {
    mode: 'production',
    output: {
        filename: 'bundle.[contentHash:8].js',
        path: distPath,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: ['url-loader'],
                    options: {
                        limit: 5 * 1024,
                        outputPath: '/img'
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify('production')
        })
    ]
})