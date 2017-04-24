import * as request from 'request';

import { UserModel } from '../user/user.model';
import { ImageModel } from './image.model';
import { postImage } from './post-image.controller';
import { testImage, testUser } from '../testing/test-data';
import { setupTest, resetTest, teardownTest } from '../testing/utils';

function requestError(url: string, cb: any) {
  cb(new Error(url), null ,null);
}

function request404(url: string, cb: any) {
  cb(null, { statusCode: 404 }, null);
}

function requestSuccess(url: string, cb: any) {
  cb(
    null,
    { statusCode: 200, headers: { 'content-type': 'image/jpeg' } },
    null,
  );
}

function requestText(url: string, cb: any) {
  cb(
    null,
    { statusCode: 200, headers: { 'content-type': 'text/html' } },
    null,
  )
}

function requestTimeout(url: string, cb: any) {
}
  
describe('postImage controller', () => {
  beforeAll(setupTest);
  beforeEach(resetTest([
    { model: ImageModel, value: testImage },
    { model: UserModel, value: testUser },
  ]));
  afterAll(teardownTest);

  const url = 'https://some/url';
  const userID = testUser._id;

  it('should post an image', done => {
    const spy = spyOn(request, 'get').and.callFake(requestSuccess);
    const now = Date.now();
    const url = 'https://some/url';

    postImage({ url, userID })
      .then(image => {
        expect(spy).toHaveBeenCalled();
        expect(image.url).toEqual(url);
        expect(image.owner.toString()).toEqual(testUser._id);
        expect(image.description).toBeUndefined();
        expect(image.likers.toObject()).toEqual([]);
        expect(image.likerCount).toBe(0);
        expect(image.date).toBeGreaterThanOrEqual(now);
        expect(image.date).toBeLessThanOrEqual(Date.now());
      })
      .then(done, done.fail);
  });

  it('should reject if error in requesting image', done => {
    spyOn(request, 'get').and.callFake(requestError);
    postImage({ url, userID }).then(done.fail, done);
  });

  it('should reject if url is invalid', done => {
    spyOn(request, 'get').and.callFake(request404);
    postImage({ userID, url }).then(done.fail, done);
  });

  it('should reject if request timeout', done => {
    spyOn(request, 'get').and.callFake(requestTimeout);
    postImage({ userID, url }).then(done.fail, done);
  }, 100000);

  it('should reject if url is not image', done => {
    spyOn(request, 'get').and.callFake(requestText);
    postImage({ userID, url }).then(done.fail, done);
  });
});
