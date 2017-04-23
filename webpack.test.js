const path = require('path');
const webpack = require('webpack');

const CLIENT = path.resolve(__dirname, 'src', 'client');

module.exports = {
  devtool: 'inline-source-map',

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
        test: /\.html$/,
        use: 'raw-loader',
      },
      {
        test: /\.component\.(?:sa|s?c)ss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:a|s?c)ss/,
        exclude: /\.component\.(?:sa|s?c)ss$/,
        use: 'null-loader',
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test'),
    }),
    new webpack.ContextReplacementPlugin(
      /angular(?:\\|\/)core(?:\\|\/)@angular/,
      CLIENT,
      {}
    ),
  ],
};

