import { ImageModel } from './image.model';

export function listImages(offset = 0, limit = 10): Promise<any> {
  return ImageModel
    .find({})
    .sort({ date: -1 })
    .skip(offset)
    .limit(limit)
    .populate('owner')
    .populate('likers')
    .exec()
    .catch((err) => {
      console.error(`Error when listing images: ${err}`);
      throw err;
    });
}
