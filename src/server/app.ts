import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as path from 'path';

import { apiRouter } from './api';
import { authRouter } from './auth/passport.config';
import { errorHandler } from './helpers/error-handler';

/* tslint:disable: no-console */

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
app.use(compression());
app.use(helmet());

const SECRET = process.env.SECRET || 'keyboard cat';
const SESSION_OPTIONS = {
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  maxAge: 24 * 60 * 60 * 1000,
};
if (process.env.NODE_ENV === 'production') {
  app.use(require('cookie-session')(SESSION_OPTIONS));
} else {
  app.use(require('express-session')(SESSION_OPTIONS));
}

app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);
app.use(apiRouter);

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

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(
  `${process.env.NODE_ENV} server is listening on port ${PORT}`,
));
