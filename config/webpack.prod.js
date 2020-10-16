const webpack = require('webpack')
const { merge } = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common.js')

// Disable React DevTools in production
const disableReactDevtools = `
<script>
if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
   __REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
}
</script>
`

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      // Styles
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
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[fullhash].css',
      chunkFilename: 'styles/[name].[id].[fullhash].css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      template: './public/template.html',
      favicon: './public/favicon.ico',
      hash: true,
      disableReactDevtools,
    }),
    new webpack.SourceMapDevToolPlugin({
      exclude: ['/node_modules/'],
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: 'single',
  },
})
