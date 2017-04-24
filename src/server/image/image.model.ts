import { model, Schema } from 'mongoose';

export class Image {
  /* tslint:disable-next-line */
  _id?: string;
  date?: Date;
  description?: string;
  likers: string[];
  owner: string;
  url: string;
}

export const imageSchema = new Schema({
  date: {
    default: Date.now,
    type: Date,
  },

  description: {
    maxlength: 128,
    type: String,
  },

  likers: {
    default: [],
    type: [{
      ref: 'User',
      required: true,
      type: Schema.Types.ObjectId,
    }],
  },

  owner: {
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  },

  url: {
    match: /^https?:\/\/.+/,
    required: true,
    type: String,
  },
});

imageSchema
  .virtual('likerCount')
  .get(function() {
    return this.likers.length;
  });

imageSchema.set('toObject', { virtuals: true });
imageSchema.set('toJSON', { virtuals: true });

export const ImageModel = model('Image', imageSchema, 'images');
