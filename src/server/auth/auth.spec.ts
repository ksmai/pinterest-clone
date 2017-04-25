import * as express from 'express';
import * as passport from 'passport';
import * as supertest from 'supertest';

describe('auth', () => {
  const userID = 'someid';

  beforeEach(() => {
    process.env.TWITTER_CONSUMER_KEY = '123';
    process.env.TWITTER_CONSUMER_SECRET = '456';

    spyOn(passport, 'use');
    spyOn(passport, 'serializeUser');
    spyOn(passport, 'deserializeUser');

    spyOn(passport, 'authenticate')
      .and.callFake((strategy: any, options: any) => {
        return (req: any, res: any, next: any) => {
          if (strategy === 'twitter') {
            if (options && options.failureRedirect) {
              req.user = { _id: userID };
            } else if(!options) {
              res.redirect('/auth/twitter/callback');

              return;
            }
          }
          next();
        };
      });
  });

  describe('unauthenticated user', () => {
    let request: any;

    beforeEach(() => {
      const app = express();
      app.use(require('./passport.config').authRouter);
      app.get('/', (req, res) => res.send('Hello World'));
      request = supertest(app);
    });

    it('should not be able to logout', (done) => {
      request
        .get('/auth/logout')
        .expect(401)
        .then(done, done.fail);
    });

    it('should not be able to check identity', (done) => {
      request
        .get('/auth/me')
        .expect(401)
        .then(done, done.fail);
    });

    it('should be able to login', (done) => {
      request
        .get('/auth/twitter')
        .expect(302)
        .expect('Location', /callback/)
        .then(done, done.fail);
    });
  });

  describe('authenticated user', () => {
    let request: any;

    beforeEach(() => {
      const app = express();
      app.use((req: any, res: any, next: any) => {
        req.user = { _id: userID };
        next();
      });
      app.use(require('./passport.config').authRouter);
      app.get('/', (req, res) => res.send('hello world'));
      request = supertest(app);
    });

    it('should be able to logout', (done) => {
      request
        .get('/auth/logout')
        .expect(302)
        .expect('Location', '/')
        .then(done, done.fail);
    });

    it('should be able to check identity', (done) => {
      request
        .get('/auth/me')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: any) => {
          expect(res.body.user).toBeDefined();
        })
        .then(done)
        .catch(done.fail);
    });

    it('should be able to callback into the app', (done) => {
      request
        .get('/auth/twitter/callback')
        .expect(302)
        .expect('Location', '/')
        .then(done, done.fail);
    });

    it('should not be able to re-login', (done) => {
      request
        .get('/auth/twitter')
        .expect(401)
        .then(done, done.fail);
    });
  });
});
