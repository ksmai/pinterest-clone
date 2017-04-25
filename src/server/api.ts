import * as bodyParser from 'body-parser';
import { Router } from 'express';

import { ensureLogin } from './auth/helpers';
import { errorHandler } from './helpers/error-handler';
import { deleteImage } from './image/delete-image.controller';
import { likeImage } from './image/like-image.controller';
import { listImages, listMyImages } from './image/list-images.controller';
import { postImage } from './image/post-image.controller';

export const apiRouter = Router();
const jsonParser = bodyParser.json();

apiRouter.get('/api/v1/image/me', ensureLogin, (req, res, next) => {
  listMyImages(req.user._id)
    .then((images) => res.json({ images }))
    .catch((err) => next(err));
});

apiRouter
  .route('/api/v1/image')

  .get((req, res, next) => {
    const skip = +req.query.skip || 0;
    const limit = +req.query.limit || 10;

    listImages(skip, limit)
      .then((images) => res.json({ images }))
      .catch((err) => next(err));
  })

  .post(ensureLogin, jsonParser, (req, res, next) => {
    postImage({
      userID: req.user._id,
      description: req.body.description,
      url: req.body.url,
    })
      .then((image) => res.json({ image }))
      .catch((err) => next(err));
  })

  .put(ensureLogin, jsonParser, (req, res, next) => {
    likeImage({
      userID: req.user._id,
      imageID: req.body.imageID,
    })
      .then((image) => res.json({ image }))
      .catch((err) => next(err));
  })

  .delete(ensureLogin, jsonParser, (req, res, next) => {
    deleteImage({
      userID: req.user._id,
      imageID: req.body.imageID,
    })
      .then((image) => res.json({ image }))
      .catch((err) => next(err));
  });

apiRouter.use(errorHandler);
