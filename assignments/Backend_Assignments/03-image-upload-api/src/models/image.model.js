import mongoose from 'mongoose';

/**
 * TODO: Define Image schema
 *
 * Fields:
 * - originalName: String, required, trim, maxlength 255
 * - filename: String, required, unique
 * - mimetype: String, required, enum: ['image/jpeg', 'image/png', 'image/gif']
 * - size: Number, required, min 1, max 5MB (5 * 1024 * 1024)
 * - width: Number, required, min 1
 * - height: Number, required, min 1
 * - thumbnailFilename: String, required
 * - description: String, optional, trim, maxlength 500, default ''
 * - tags: [String], optional, default [], max 10 tags
 *   Use validate: { validator: (arr) => arr.length <= 10, message: 'Cannot have more than 10 tags' }
 * - uploadDate: Date, default Date.now
 *
 * Options:
 * - Enable timestamps (createdAt, updatedAt)
 *
 * Indexes:
 * - uploadDate: -1
 * - mimetype: 1, uploadDate: -1
 * - Text index on originalName and description for search
 */

const imageSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: [true, 'Original Name is required'],
      trim: true,
      maxLength: [255, 'Original Name must not exceed 255 characters'],
    },
    filename: {
      type: String,
      required: [true, 'File name is required'],
      unique: true,
    },
    mimetype: {
      type: String,
      required: [true, 'Mime type is required'],
      enum: ['image/jpeg', 'image/png', 'image/gif'],
    },
    size: {
      type: Number,
      required: [true, 'Size is required'],
      min: 1,
      max: 5 * 1024 * 1024,
    },
    width: {
      type: Number,
      required: [true, 'Width is required'],
      min: 1,
    },
    height: {
      type: Number,
      required: [true, 'Height is required'],
      min: 1,
    },
    thumbnailFilename: {
      type: String,
      required: [true, 'Thumbnail filename is required'],
    },
    description: {
      type: String,
      optional: true,
      trim: true,
      maxLength: 500,
      default: '',
    },
    tags: {
      type: [String],
      optional: true,
      default: [],
      validate: {
        validator: function (value) {
          return value.length <= 10;
        },
        message: 'Cannot add more than 10 tags',
      },
    },
    uploadDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

// TODO: Add indexes
imageSchema.index({ uploadDate: -1 });
imageSchema.index({ mimetype: 1, uploadDate: -1 });
imageSchema.index({ originalName: 'text', description: 'text' });

// TODO: Create and export the Image model
export const Image = mongoose.model('Image', imageSchema);
