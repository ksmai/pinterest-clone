import { Image } from '../image/image.model';
import { User } from '../user/user.model';

export const testUser: User = {
  name: 'My Cool Name',
  picture: 'mypic.jpg',
  twitterID: 'mytwitterid',
  /* tslint:disable-next-line */
  _id: '58fdf278abe27f2a035c3d54',
};

export const testImage: Image = {
  likers: [testUser._id],
  owner: testUser._id,
  url: 'https://some/url',
};
