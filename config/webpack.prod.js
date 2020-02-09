const webpack = require('webpack')
const merge = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  /**
   * Mode
   *
   * Use production optimizations.
   */
  mode: 'production',

  /**
   * Devtool
   *
   * No source maps in production - creates the fastest build.
   */
  devtool: false,

  module: {
    rules: [
      /**
       * Styles (production)
       *
       * Load into files instead of injecting into the head.
       */
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      /**
       * Images (production)
       *
       * Add image webpack loader for image optimization.
       */
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
          'image-webpack-loader',
        ],
      },
    ],
  },

  plugins: [
    /**
     * MiniCssExtractPlugin
     *
     * Extracts CSS into separate files.
     */
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[hash].css',
      chunkFilename: 'styles/[name].[hash].css',
      ignoreOrder: false,
    }),
    new webpack.SourceMapDevToolPlugin({
      exclude: ['/node_modules/'],
    }),
  ],

  /**
   * Performance
   *
   * Set max asset sizes but do not show additional hints on production build.
   */
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  /**
   * Optimization
   *
   * Production minimizing of JavaSvript and CSS assets.
   */
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: 'single',
    splitChunks: {
      // Cache vendors since this code won't change very often
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|lodash|axios)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
})
