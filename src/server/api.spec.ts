import * as express from 'express';
import * as supertest from 'supertest';

import * as listImagesController from './image/list-images.controller';
import * as likeImageController from './image/like-image.controller';
import * as postImageController from './image/post-image.controller';
import * as deleteImageController from './image/delete-image.controller';
import { apiRouter } from './api';

describe('api', () => {
  let request: any;
  const userID = 'someuserid';
  const url = '/api/v1/image';
  const errorMessage = 'hello world';
  const error = new Error(errorMessage);

  describe('unauthenticated user', () => {
    beforeAll(() => {
      const app = express();
      app.use(apiRouter);
      request = supertest(app);
    });

    it('should list images with pagination', (done) => {
      const skip = 42;
      const limit = 13;
      const spy = spyOn(listImagesController, 'listImages')
        .and
        .returnValue(Promise.resolve([]));

      request
        .get(url)
        .query({ skip, limit })
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: any) => {
          expect(spy).toHaveBeenCalledWith(skip, limit);
          expect(res.body.images).toBeDefined();
        })
        .then(done)
        .catch(done.fail);
    });

    it('should not be able to post new image', (done) => {
      const imageUrl = 'https://image/cool';
      const spy = spyOn(postImageController, 'postImage');

      request
        .post(url)
        .send({ url: imageUrl })
        .expect(401)
        .expect('Content-Type', /json/)
        .then((res: any) => {
          expect(spy).not.toHaveBeenCalled();
          expect(res.body.error).toBeDefined();
        })
        .then(done)
        .catch(done.fail);
    });

    it('should not be able to like image', (done) => {
      const imageID = 'someimageid';
      const spy = spyOn(likeImageController, 'likeImage');

      request
        .put(url)
        .send({ imageID })
        .expect(401)
        .expect('Content-Type', /json/)
        .then((res: any) => {
          expect(spy).not.toHaveBeenCalled();
          expect(res.body.error).toBeDefined();
        })
        .then(done)
        .catch(done.fail);
    });

    it('should not be able to delete any image', (done) => {
      const imageID = 'someimageidtobedeleted';
      const spy = spyOn(deleteImageController, 'deleteImage');

      request
        .delete(url)
        .send({ imageID })
        .expect(401)
        .expect('Content-Type', /json/)
        .then((res: any) => {
          expect(spy).not.toHaveBeenCalled();
          expect(res.body.error).toBeDefined();
        })
        .then(done)
        .catch(done.fail);
    });
  });

  describe('authenticated user', () => {
    beforeAll(() => {
      const app = express();
      app.use((req, res, next) => {
        req.user = { _id: userID };
        next();
      });
      app.use(apiRouter);
      request = supertest(app);
    });

    it('should list images with pagination', (done) => {
      const spy = spyOn(listImagesController, 'listImages')
        .and
        .returnValue(Promise.resolve([]));

      request
        .get(url)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: any) => {
          expect(spy).toHaveBeenCalled();
          expect(res.body.images).toBeDefined();
        })
        .then(done)
        .catch(done.fail);
    });

    it('should be able to post new image', (done) => {
      const imageUrl = 'https://image/cool';
      const spy = spyOn(postImageController, 'postImage')
        .and.returnValue(Promise.resolve({}));

      request
        .post(url)
        .send({ url: imageUrl })
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: any) => {
          expect(spy).toHaveBeenCalledWith({
            userID,
            url: imageUrl,
            description: undefined,
          });
          expect(res.body.image).toBeDefined();
        })
        .then(done)
        .catch(done.fail);
    });

    it('should be able to like image', (done) => {
      const imageID = 'someimageid';
      const spy = spyOn(likeImageController, 'likeImage')
        .and.returnValue(Promise.resolve({}));

      request
        .put(url)
        .send({ imageID })
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: any) => {
          expect(spy).toHaveBeenCalledWith({ userID, imageID });
          expect(res.body.image).toBeDefined();
        })
        .then(done)
        .catch(done.fail);
    });

    it('should be able to delete image', (done) => {
      const imageID = 'someimageidtobedeleted';
      const spy = spyOn(deleteImageController, 'deleteImage')
        .and.returnValue(Promise.resolve({}));

      request
        .delete(url)
        .send({ imageID })
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: any) => {
          expect(spy).toHaveBeenCalledWith({ userID, imageID });
          expect(res.body.image).toBeDefined();
        })
        .then(done)
        .catch(done.fail);
    });

    it('should handle error when listing', (done) => {
      const skip = 42;
      const limit = 13;
      const spy = spyOn(listImagesController, 'listImages')
        .and.returnValue(Promise.reject(error));

      request
        .get(url)
        .query({ skip, limit })
        .expect(400)
        .expect('Content-Type', /json/)
        .then((res: any) => {
          expect(spy).toHaveBeenCalledWith(skip, limit);
          expect(res.body.error).toEqual(errorMessage);
        })
        .then(done)
        .catch(done.fail);
    });

    it('should be handling error when posting', (done) => {
      const imageUrl = 'https://image/cool';
      const spy = spyOn(postImageController, 'postImage')
        .and.returnValue(Promise.reject(error));

      request
        .post(url)
        .send({ url: imageUrl })
        .expect(400)
        .expect('Content-Type', /json/)
        .then((res: any) => {
          expect(spy).toHaveBeenCalledWith({
            userID,
            url: imageUrl,
            description: undefined,
          });
          expect(res.body.error).toEqual(errorMessage);
        })
        .then(done)
        .catch(done.fail);
    });

    it('should handler error when liking', (done) => {
      const imageID = 'someimageid';
      const spy = spyOn(likeImageController, 'likeImage')
        .and.returnValue(Promise.reject(error));

      request
        .put(url)
        .send({ imageID })
        .expect(400)
        .expect('Content-Type', /json/)
        .then((res: any) => {
          expect(spy).toHaveBeenCalledWith({ userID, imageID });
          expect(res.body.error).toEqual(errorMessage);
        })
        .then(done)
        .catch(done.fail);
    });

    it('should handler error when deleting', (done) => {
      const imageID = 'someimageidtobedeleted';
      const spy = spyOn(deleteImageController, 'deleteImage')
        .and.returnValue(Promise.reject(error));

      request
        .delete(url)
        .send({ imageID })
        .expect(400)
        .expect('Content-Type', /json/)
        .then((res: any) => {
          expect(spy).toHaveBeenCalledWith({ userID, imageID });
          expect(res.body.error).toEqual(errorMessage);
        })
        .then(done)
        .catch(done.fail);
    });
  });
});
