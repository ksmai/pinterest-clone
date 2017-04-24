import * as request from 'request';
import { ImageModel } from './image.model';

function checkImageUrl(url: string): Promise<any> {
  const TIMEOUT = 8000;

  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      if (err) {
        return reject(err);
      }

      if (!res || res.statusCode !== 200) {
        return reject(new Error(`Fail when requesting ${url}`));
      }

      const contentType = res.headers['Content-Type'] ||
        res.headers['content-type'];
      const isImage = contentType && /image/.test(contentType);
      if (!isImage) {
        return reject(new Error(`${url} is not an image`));
      }

      resolve(url);
    });

    setTimeout(
      () => reject(new Error(`Timeout when requesting ${url}`)),
      TIMEOUT,
    );
  });
}

export function postImage({ userID, url, description }: {
  userID: any,
  url: string,
  description?: string,
}): Promise<any> {
  return Promise
    .resolve()
    .then(() => checkImageUrl(url))
    .then(() => ImageModel.create({ url, description, owner: userID }))
    .catch((err) => {
      console.error(`Fail to post image: ${url}\n${err}`);
      throw err;
    });
}
