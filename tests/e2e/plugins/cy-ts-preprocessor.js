const path = require('path')

const wp = require('@cypress/webpack-preprocessor')

const webpackOptions = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../../../src/client'),
      '@resources': path.resolve(__dirname, '../../../src/resources'),
    },
    // Polyfills
    fallback: {
      path: require.resolve('path-browserify'), // Needed for cypress-file-upload
      stream: require.resolve('stream-browserify'), // Needed to import utils from client folder
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
}

const options = { webpackOptions }

module.exports = wp(options)
