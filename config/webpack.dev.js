const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  /**
   * Mode
   *
   * Use development optimizations.
   */
  mode: 'development',

  /**
   * Devtool
   *
   * Control how source maps are generated. This option is slowest initial build
   * with highest quality source mapping.
   */
  devtool: 'eval-source-map',

  module: {
    rules: [
      /**
       * Styles (development)
       *
       * Inject CSS into the head with source maps.
       */
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

      /**
       * Images (development)
       *
       * Copy image files to dist folder.
       */
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
    ],
  },

  /**
   * DevServer
   *
   * Spin up a server for quick development.
   */
  devServer: {
    // Necessary for React routing
    historyApiFallback: true,
    // Proxy API in dev mode to different port.
    proxy: {
      '/api': 'http://localhost:5000',
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },

  plugins: [
    /**
     * HotModuleReplacementPlugin
     *
     * Only update what has changed - like injecting new CSS - without reloading
     * the whole page.
     */
    new webpack.HotModuleReplacementPlugin(),
  ],
})
