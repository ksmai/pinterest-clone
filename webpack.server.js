const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const DIST = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'source-map',

  entry: {
    server: './src/server/app.ts',
  },

  output: {
    path: DIST,
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader',
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],

  externals: [nodeExternals()],

  target: 'node',

  node: {
    __dirname: true,
    __filename: true,
  },
};

