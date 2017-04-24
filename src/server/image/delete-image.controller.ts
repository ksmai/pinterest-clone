import { ImageModel } from './image.model';

export function deleteImage(
  { userID, imageID }: { userID: any, imageID: string },
): Promise<any> {
  const query = {
    owner: userID,
    _id: imageID,
  };
  
  return ImageModel
    .findOne(query)
    .then(image => {
      if (!image) {
        const err = `Cannot delete image "${imageID}"`;
        console.error(err);
        throw new Error(err);
      }

      return image.remove();
    })
    .catch(err => {
      console.error(`Error when deleting image: ${err}`);
      throw err;
    });
}
