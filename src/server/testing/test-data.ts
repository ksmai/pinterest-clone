import { User } from '../user/user.model';
import { Image } from '../image/image.model';

export const testUser: User = {
  twitterID: 'mytwitterid',
  name: 'My Cool Name',
  picture: 'mypic.jpg',
  _id: '58fdf278abe27f2a035c3d54',
};

export const testImage: Image = {
  url: 'https://some/url',
  owner: testUser._id,
  likers: [testUser._id],
};
