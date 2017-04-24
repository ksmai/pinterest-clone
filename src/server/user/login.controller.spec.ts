import * as mongoose from 'mongoose';

import { testUser } from '../testing/test-data';
import { resetTest, setupTest, teardownTest } from '../testing/utils';
import { login } from './login.controller';
import { User, UserModel } from './user.model';

describe('login controller', () => {
  beforeAll(setupTest);
  beforeEach(resetTest([{ model: UserModel, value: testUser }]));
  afterAll(teardownTest);

  it('should log existing user in', (done) => {
    login(testUser)
      .then((user) => {
        const userObj = Object.assign(
          {},
          user.toObject(),
          { _id: user._id.toString() },
        );
        expect(userObj).toEqual(jasmine.objectContaining(testUser));

        return UserModel.find({}).exec();
      })
      .then((users) => {
        expect(users.length).toBe(1);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should create new record for new user', (done) => {
    const newUser: User = {
      name: 'A NEW USER',
      picture: 'new.png',
      twitterID: testUser.twitterID + 'somesuffix',
    };

    login(newUser)
      .then((user) => {
        expect(user).toEqual(jasmine.objectContaining(newUser));

        return UserModel.find({}).exec();
      })
      .then((users) => {
        expect(users.length).toBe(2);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should reject if user data is invalid', (done) => {
    const invalidUser = {
      picture: 'user.without.name.jpg',
      twitterID: 'someid',
    };

    login(invalidUser as User).then(done.fail, done);
  });
});
