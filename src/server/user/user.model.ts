import { model, Schema } from 'mongoose';

export class User {
  name: string;
  picture: string;
  twitterID: string;
};

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  picture: {
    type: String,
    required: true,
  },

  twitterID: {
    type: String,
    required: true,
  },
});

export const UserModel = model('User', userSchema, 'users');
