import { Router } from 'express';
import * as passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

import { deserialize } from '../user/deserialize.controller';
import { ensureLogin, ensureNotLogin } from './helpers';
import { errorHandler } from '../helpers/error-handler';
import { login } from '../user/login.controller';
import { User } from '../user/user.model';

const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
const callbackURL = '/auth/twitter/callback';

if (!consumerKey || !consumerSecret) {
  throw new Error('TWITTER_CONSUMER_KEY / TWITTER_CONSUMER_SECRET is missing\nSet them in your environment');
}

const twitterOptions = { consumerKey, consumerSecret, callbackURL };
const twitterCallback = (
  token: any,
  tokenSecret: any,
  profile: any,
  cb: any,
) => {
  login({
    twitterID: profile.id,
    name: profile.displayName || profile.username,
    picture: profile.photos[0].value,
  })
    .then(user => cb(null, user))
    .catch(err => cb(err));
};

passport.use(new TwitterStrategy(twitterOptions, twitterCallback));
passport.serializeUser((user: User, done: any) => done(null, user._id));
passport.deserializeUser((id: string, done: any) => {
  deserialize(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

export const authRouter = Router();

authRouter.get(
  '/auth/twitter',
  ensureNotLogin,
  passport.authenticate('twitter'),
);

authRouter.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  ensureLogin,
  (req, res) => res.redirect('/'),
);

authRouter.get(
  '/auth/logout',
  ensureLogin,
  (req, res) => {
    req.logout();
    res.redirect('/');
  },
);

authRouter.get(
  '/auth/me',
  ensureLogin,
  (req, res) => res.json({ user: req.user }),
);

authRouter.use(errorHandler);
