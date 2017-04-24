import { ImageModel } from './image.model';

export function likeImage(
  { userID, imageID }: { userID: any, imageID: string },
): Promise<any> {
  const query = {
    _id: imageID,
    likers: { $ne: userID },
  };

  const updates = {
    $push: { likers: userID },
  };

  const options = {
    new: true,
    runValidators: true,
    upsert: false,
  };

  return ImageModel
    .findOneAndUpdate(query, updates, options)
    .exec()
    .then((image) => {
      if (!image) {
        const err = `Fail to like image "${imageID}"`;
        console.error(err);
        throw new Error(err);
      }

      return image;
    });
}
