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
    type: Date,
    default: Date.now,
  },

  description: {
    type: String,
    maxlength: 128,
    trim: true,
  },

  likers: {
    type: [{
      ref: 'User',
      required: true,
      type: Schema.Types.ObjectId,
    }],
    default: [],
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  url: {
    type: String,
    match: /^https?:\/\/.+/,
    required: true,
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
