import { model, Schema, Document } from 'mongoose';

interface IRecipe extends Document {
  title: string;
  meal: string;
  difficulty: string;
  details: string;
  image: string;
}

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
  },
);

export default model<IRecipe>('Recipe', RecipeSchema);
