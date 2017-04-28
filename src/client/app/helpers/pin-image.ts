import { User } from './user';

export class PinImage {
  _id: string; /* tslint:disable-line */
  url: string;
  description: string;
  likers: User[];
  owner: User;
  date: string;
  show?: boolean;
}
