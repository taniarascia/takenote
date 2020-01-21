const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: ['./src/client/index.tsx'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx'],
    alias: {
      '~': path.resolve(__dirname, '..', 'src', 'client'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: 'assets',
        ignore: ['*.DS_Store', 'favicon.ico', 'template.html'],
      },
    ]),
    new HtmlWebpackPlugin({
      template: './public/template.html',
      favicon: './public/favicon.ico',
    }),
  ],
}
