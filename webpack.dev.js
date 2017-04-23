const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const CLIENT = path.resolve(__dirname, 'src', 'client');
const DIST = path.resolve(__dirname, 'dist');
const INDEX = path.join(CLIENT, 'index.html');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    polyfills: './src/client/polyfills.ts',
    main: ['./src/client/main.ts', 'webpack-hot-middleware/client'],
  },

  output: {
    path: DIST,
    publicPath: '/',
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader'],
      },
      {
        test: /\.component\.html$/,
        use: 'raw-loader',
      },
      {
        test: /\.component\.(?:sa|s?c)ss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:sa|s?c)ss$/,
        exclude: /\.component\.(?:sa|s?c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.ContextReplacementPlugin(
      /angular(?:\\|\/)core(?:\\|\/)@angular/,
      CLIENT,
      {}
    ),
    new HTMLWebpackPlugin({
      template: INDEX,
    }),
  ],
};

