import { model, Schema } from 'mongoose';

const RecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    meal: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Recipe', RecipeSchema);
