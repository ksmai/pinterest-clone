import { model, Schema } from 'mongoose';

export class User {
  /* tslint:disable-next-line: variable-name */
  _id?: string;
  name: string;
  picture: string;
  twitterID: string;
}

export const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },

  picture: {
    required: true,
    type: String,
  },

  twitterID: {
    required: true,
    type: String,
  },
});

export const UserModel = model('User', userSchema, 'users');
