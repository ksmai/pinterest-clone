import * as mongoose from 'mongoose';

import { testUser } from '../testing/test-data';
import { User, UserModel } from './user.model';
import { setupTest, resetTest, teardownTest } from '../testing/utils';
import { login } from './login.controller';

describe('login controller', () => {
  beforeAll(setupTest);
  beforeEach(resetTest([{ model: UserModel, value: testUser }]));
  afterAll(teardownTest);

  it('should log existing user in', done => {
    login(testUser)
      .then(user => {
        expect(user).toEqual(jasmine.objectContaining(testUser));

        return UserModel.find({}).exec();
      })
      .then(users => {
        expect(users.length).toBe(1);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should create new record for new user', done => {
    const newUser: User = {
      twitterID: testUser.twitterID + 'somesuffix',
      name: 'A NEW USER',
      picture: 'new.png',
    };

    login(newUser)
      .then(user => {
        expect(user).toEqual(jasmine.objectContaining(newUser));

        return UserModel.find({}).exec();
      })
      .then(users => {
        expect(users.length).toBe(2);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should reject if user data is invalid', done => {
    const invalidUser = {
      twitterID: 'someid',
      picture: 'user.without.name.jpg',
    };

    login(<User>invalidUser).then(done.fail, done);
  });
});
