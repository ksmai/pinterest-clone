import * as mongoose from 'mongoose';

import { testUser } from '../testing/test-data';
import { resetTest, setupTest, teardownTest } from '../testing/utils';
import { deserialize } from './deserialize.controller';
import { User, UserModel } from './user.model';

describe('Deserialize controller', () => {
  let id: string;

  beforeAll(setupTest);
  beforeEach(resetTest([{ model: UserModel, value: testUser }]));

  beforeEach((done) => {
    UserModel
      .findOne({})
      .then((user) => id = user._id.toString())
      .then(done, done.fail);
  });

  afterAll(teardownTest);

  it('can deserialize an existing user', (done) => {
    deserialize(id)
      .then((user) => {
        const userObj = Object.assign(
          {},
          user.toObject(),
          { _id: user._id.toString() },
        );
        expect(userObj).toEqual(jasmine.objectContaining(testUser));
      })
      .then(done, done.fail);
  });

  it('should reject if id not found', (done) => {
    deserialize(id.replace(/./g, '1')).then(done.fail, done);
  });
});
