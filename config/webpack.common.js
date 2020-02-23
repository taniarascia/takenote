const path = require('path')

const dotenv = require('dotenv')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

/**
 * Obtain client id for OAuth link in React
 *
 * If in development mode or local production mode, search the .env file for
 * client id. If using Docker, pass a build arg.
 *
 */
const getEnvFromDotEnvFile = dotenv.config()
let envKeys
if (getEnvFromDotEnvFile.error) {
  console.log('Getting environment variables from build args for production') // eslint-disable-line
  envKeys = {
    'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
    'process.env.NODE_ENV': JSON.stringify('production'),
  }
} else {
  envKeys = { 'process.env.CLIENT_ID': JSON.stringify(getEnvFromDotEnvFile.parsed['CLIENT_ID']) }
}

module.exports = {
  /**
   * Entry
   *
   * Webpack will look at index.tsx for the entrypoint of the app.
   */
  entry: ['./src/client/index.tsx'],

  /**
   * Output
   *
   * Webpack will output the assets and bundles to the dist folder.
   */
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      /**
       * TypeScript (.ts/.tsx files)
       *
       * The TypeScript loader will compile all .ts/.tsx files to .js. Babel is
       * not necessarry here since TypeScript is taking care of all transpiling.
       */
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },

      /**
       * Fonts
       *
       * Inline font files.
       */
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'fonts/[name].[ext]',
        },
      },

      /**
       * Markdown
       *
       * Parse raw string.
       */
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
    ],
  },

  resolve: {
    // Resolve in this order
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.md'],
    // Allow `@/` to map to `src/client/`
    alias: {
      '@': path.resolve(__dirname, '../src/client'),
      '@resources': path.resolve(__dirname, '../src/resources'),
    },
  },

  plugins: [
    // Get environment variables in React
    new webpack.DefinePlugin(envKeys),
    /**
     * CleanWebpackPlugin
     *
     * Removes/cleans build folders and unused assets when rebuilding.
     */
    new CleanWebpackPlugin(),

    /**
     * CopyWebpackPlugin
     *
     * Will copy everything from the public folder to an assets folder in dist.
     */
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: 'assets',
        // Ignore some files to prevent unnecessary duplication
        ignore: ['*.DS_Store', 'favicon.ico', 'template.html'],
      },
    ]),
  ],
}
