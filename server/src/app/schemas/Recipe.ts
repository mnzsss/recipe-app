import { model, Schema, Document } from 'mongoose';

interface IRecipe extends Document {
  image: string;
  title: string;
  difficulty: string;
  description: string;
  ingredients: string[];
  prepare_mode: string;
}

const RecipeSchema = new Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
      max: 10,
      min: 1,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    prepare_mode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IRecipe>('Recipe', RecipeSchema);
