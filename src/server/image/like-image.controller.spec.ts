import { ImageModel } from './image.model';
import { likeImage } from './like-image.controller';
import { testImage } from '../testing/test-data';
import { setupTest, resetTest, teardownTest } from '../testing/utils';

describe('likeImage controller', () => {
  const userID = '58fe03ef5ec22266a56f96b5';
  let imageID: string;

  beforeAll(setupTest);
  beforeEach(resetTest([{ model: ImageModel, value: testImage }]));
  beforeEach(done => {
    ImageModel
      .findOne({})
      .exec()
      .then(image => imageID = image._id.toString())
      .then(done, done.fail);
  });
  afterAll(teardownTest);


  it('should like an image', done => {
    likeImage({ userID, imageID })
      .then(image => {
        const likers = image.likers.map((liker: any) => liker.toString());
        expect(likers).toContain(userID);
      })
      .then(done, done.fail);
  });

  it('should not allow same user to like an image twice', done => {
    likeImage({ userID, imageID })
      .then(() => likeImage({ userID, imageID }))
      .then(done.fail, done);
  });

  it('should reject if image does not exist', done => {
    likeImage({ userID, imageID: userID }).then(done.fail, done);
  });
});
