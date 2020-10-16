const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      // Styles
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/template.html',
      favicon: './public/favicon.ico',
    }),
  ],
})
