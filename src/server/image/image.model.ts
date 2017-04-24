import { model, Schema } from 'mongoose';

export class Image {
  _id?: string;
  url: string;
  owner: string;
  description?: string;
  likers: string[];
  date?: Date;
}

export const imageSchema = new Schema({
  url: {
    type: String,
    required: true,
    match: /^https?:\/\/.+/,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  description: {
    type: String,
    maxlength: 128,
  },

  likers: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }],
    default: [],
  },

  date: {
    type: Date,
    default: Date.now,
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
