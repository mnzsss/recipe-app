import { model, Schema } from 'mongoose';

const FileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hash_name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('File', FileSchema);
