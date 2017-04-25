import { testImage, testUser } from '../testing/test-data';
import { resetTest, setupTest, teardownTest } from '../testing/utils';
import { UserModel } from '../user/user.model';
import { ImageModel } from './image.model';
import { listImages, listMyImages } from './list-images.controller';

describe('listImages controller', () => {
  beforeAll(setupTest);
  afterAll(teardownTest);
  beforeEach(resetTest([
    { model: UserModel, value: testUser },
    { model: ImageModel, value: testImage },
  ]));

  it('should list an array of images', (done) => {
    listImages()
      .then((images) => {
        expect(images.length).toBeGreaterThan(0);
        expect(images[0].url).toEqual(testImage.url);
        expect(images[0].owner.name).toEqual(testUser.name);
        expect(images[0].likerCount).toBe(1);
        expect(images[0].likers[0].twitterID).toEqual(testUser.twitterID);
      })
      .then(done, done.fail);
  });

  it('should be able to skip/limit', (done) => {
    listImages(1, 1)
      .then((images) => {
        expect(images.length).toBe(0);
      })
      .then(done, done.fail);
  });

  it('should reject if invalid skip/limit', (done) => {
    listImages(-1, -2).then(done.fail, done);
  });

  it('should list all images of an user', (done) => {
    listMyImages(testUser._id)
      .then((images) => {
        expect(images.length).toBeGreaterThan(0);
        expect(images[0].url).toEqual(testImage.url);
        expect(images[0].owner.name).toEqual(testUser.name);
        expect(images[0].likerCount).toBe(1);
        expect(images[0].likers[0].twitterID).toEqual(testUser.twitterID);
      })
      .then(done, done.fail);
  });

  it('should reject if invalid userid', (done) => {
    listMyImages('abc').then(done.fail, done);
  });
});
