import { ImageModel } from './image.model';
import { deleteImage } from './delete-image.controller';
import { testImage } from '../testing/test-data';
import { setupTest, resetTest, teardownTest } from '../testing/utils';

describe('deleteImage controller', () => {
  beforeAll(setupTest);
  beforeEach(resetTest([{ model: ImageModel, value: testImage }]));
  afterAll(teardownTest);

  it('should delete an image', done => {
    ImageModel
      .findOne({})
      .then((image: any) => deleteImage({
        userID: image.owner.toString(),
        imageID: image._id.toString(),
      }))
      .then(() => ImageModel.find({}))
      .then((images: any) => {
        expect(images.length).toBe(0);
      })
      .then(done, done.fail);
  });

  it('should reject if userID/imageID is wrong', done => {
    let userID: string;
    let imageID: string;

    ImageModel
      .findOne({})
      .then((image: any) => {
        userID = image.owner.toString();
        imageID = image._id.toString();

        return deleteImage({ userID: imageID, imageID });
      })
      .then(done.fail)
      .catch(() => deleteImage({ userID, imageID: userID }))
      .then(done.fail)
      .catch(() => ImageModel.find({}))
      .then((images: any) => {
        expect(images.length).toBeGreaterThan(0);
      })
      .then(done, done.fail);
  });
});
