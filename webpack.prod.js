const path = require('path');
const webpack = require('webpack');

const AotPlugin = require('@ngtools/webpack').AotPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const CLIENT = path.resolve(__dirname, 'src', 'client');
const CLIENT_APP = path.join(CLIENT, 'app');
const DIST = path.resolve(__dirname, 'dist');
const FAVICON = path.resolve(__dirname, 'assets', 'favicon.png');
const INDEX = path.join(CLIENT, 'index.html');
const TSCONFIG = path.resolve(__dirname, 'tsconfig.json');

const APP_MODULE = path.join(CLIENT_APP, 'app.module') + '#AppModule';

module.exports = {
  devtool: 'source-map',

  entry: {
    polyfills: './src/client/polyfills.ts',
    main: './src/client/main.ts',
  },

  output: {
    path: DIST,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: '@ngtools/webpack',
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            caseSensitive: true,
            removeAttributeQuotes: false,
          },
        },
      },
      {
        test: /\.component\.(?:sa|s?c)ss$/,
        use: [
          'to-string-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(?:sa|s?c)ss$/,
        exclude: CLIENT_APP,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(?:png|jpe?g|svg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000, 
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.ContextReplacementPlugin(
      /angular(?:\\|\/)core(?:\\|\/)@angular/,
      CLIENT,
      {}
    ),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.[chunkhash].js',
      chunks: ['main'],
      minChunks: function (module) {
        return module.context &&
          module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.[chunkhash].js',
      minChunks: Infinity,
    }),
    new AotPlugin({
      tsConfigPath: TSCONFIG,
      entryModule: APP_MODULE,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new FaviconsPlugin(FAVICON),
    new HTMLWebpackPlugin({
      template: INDEX,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        caseSensitive: true,
      },
    }),
  ],
};

