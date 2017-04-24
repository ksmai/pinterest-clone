import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';

(mongoose as any).Promise = Promise;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/pinterest';
mongoose
  .connect(MONGO_URL)
  .then(() => console.log(`MongoDB connected: ${MONGO_URL}`))
  .catch((err) => {
    console.error(`Fail to connect to ${MONGO_URL}: ${err}`);
    process.exit(1);
  });

export const app = express();

if (process.env.NODE_ENV === 'production') {
  const DIST = path.join(__dirname, '..', '..', 'dist');
  app.use(express.static(DIST));
  app.get('*', (req, res) => res.sendFile('index.html', {
    root: DIST,
  }));
} else {
  const historyApiFallback = require('connect-history-api-fallback');
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack.dev');
  const compiler = webpack(webpackConfig);
  const instance = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  });

  app.use(instance);
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(historyApiFallback());
  app.use(instance);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(
  `${process.env.NODE_ENV} server is listening on port ${PORT}`,
));
