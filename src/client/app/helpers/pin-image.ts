import { User } from './user';

export class PinImage {
  _id: string;
  url: string;
  description: string;
  likers: User[];
  owner: User;
  date: string;
}
