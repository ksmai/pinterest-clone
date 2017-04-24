import * as express from 'express';
import * as path from 'path';

export const app = express();

if (process.env.NODE_ENV === 'production') {
  const DIST = path.join(__dirname, '..', '..', 'dist');
  app.use(express.static(DIST));
  app.get('*', (req, res) => res.sendFile('index.html', {
    root: DIST,
  }));
} else {
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack.dev');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    historyApiFallback: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(
  `${process.env.NODE_ENV} server listening on port ${PORT}`
));

