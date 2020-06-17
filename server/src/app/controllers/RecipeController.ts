import fs from 'fs';
import { Request, Response } from 'express';

import path from 'path';

import Recipe from '../schemas/Recipe';

class RecipeController {
  async index(req: Request, res: Response) {
    const recipes = await Recipe.find();

    const serialiedRecipes = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        difficulty: recipe.difficulty,
        description: recipe.description,
        ingredients: recipe.ingredients,
        prepare_mode: recipe.prepare_mode,
        image_url: `${process.env.APP_URL}files/${recipe.image}`,
      };
    });

    return res.json(serialiedRecipes);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(400).json({ error: 'Recipe not found.' });
    }

    const serializedRecipe = {
      id: recipe.id,
      title: recipe.title,
      difficulty: recipe.difficulty,
      description: recipe.description,
      ingredients: recipe.ingredients,
      prepare_mode: recipe.prepare_mode,
      image_url: `${process.env.APP_URL}files/${recipe.image}`,
    };

    return res.json(serializedRecipe);
  }

  async create(req: Request, res: Response) {
    const image = req.file.filename;
    const {
      title,
      description,
      difficulty,
      prepare_mode,
      ingredients,
    } = req.body;

    const parsedIngredients = String(ingredients)
      .split('/')
      .map(ingredient => ingredient.trim());

    const recipe = await Recipe.create({
      title,
      description,
      difficulty,
      prepare_mode,
      ingredients: parsedIngredients,
      image,
    });

    const serializedRecipe = {
      id: recipe.id,
      title: recipe.title,
      difficulty: recipe.difficulty,
      description: recipe.description,
      ingredients: recipe.ingredients,
      prepare_mode: recipe.prepare_mode,
      image_url: `${process.env.APP_URL}files/${recipe.image}`,
    };

    return res.json(serializedRecipe);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(400).json({ error: 'Recipe not found.' });
    }

    const { ingredients } = req.body;

    const parsedIngredients = ingredients
      ? String(ingredients)
          .split(',')
          .map(ingredient => ingredient.trim())
      : recipe.ingredients;

    const data = {
      ...req.body,
      ingredients: parsedIngredients,
    };

    await recipe.update(data);

    if (req.file !== undefined) {
      const uploadFolder = path.resolve(__dirname, '..', '..', '..', 'uploads');

      await fs.promises.unlink(`${uploadFolder}/${recipe.image}`);

      await Recipe.update(
        { _id: id },
        {
          $set: {
            image: req.file.filename,
          },
        },
      );
    }

    return res.send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(400).json({ error: 'Recipe not found.' });
    }

    const uploadFolder = path.resolve(__dirname, '..', '..', '..', 'uploads');

    fs.promises.unlink(`${uploadFolder}/${recipe.image}`);

    await Recipe.deleteOne({ _id: recipe.id });

    return res.send();
  }
}

export default new RecipeController();
