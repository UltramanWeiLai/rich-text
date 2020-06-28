const path = require('path')
const webpack = require('webpack')
const webpackCommon = require('./webpack.common')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackCommon, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify('development')
        })
    ],
    devServer: {
        port: 8080,
        progress: true,
        contentBase: distPath,
        open: true,
        compress: true,
        proxy: {
            '/api': {
                target: 'html://localhost:8000',
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
})