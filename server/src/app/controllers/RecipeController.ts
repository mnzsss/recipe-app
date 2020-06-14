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
        meal: recipe.meal,
        details: recipe.details,
        image_url: `http://localhost:3333/files/${recipe.image}`,
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
      meal: recipe.meal,
      details: recipe.details,
      image_url: `http://localhost:3333/files/${recipe.image}`,
    };

    return res.json(serializedRecipe);
  }

  async create(req: Request, res: Response) {
    const image = req.file.filename;
    const { title, meal, difficulty, details } = req.body;

    const recipe = await Recipe.create({
      title,
      meal,
      difficulty,
      details,
      image,
    });

    const serializedRecipe = {
      id: recipe.id,
      title: recipe.title,
      difficulty: recipe.difficulty,
      meal: recipe.meal,
      details: recipe.details,
      image_url: `http://localhost:3333/files/${recipe.image}`,
    };

    return res.json(serializedRecipe);
  }

  async update(req: Request, res: Response) {
    const image = req.file.filename;
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(400).json({ error: 'Recipe not found.' });
    }

    await recipe.update(req.body);

    if (image) {
      const uploadFolder = path.resolve(__dirname, '..', '..', '..', 'uploads');

      await fs.promises.unlink(`${uploadFolder}/${recipe.image}`);

      await Recipe.update(
        { _id: id },
        {
          $set: {
            image,
          },
        },
      );
    }

    const serializedRecipe = {
      id: recipe.id,
      title: recipe.title,
      difficulty: recipe.difficulty,
      meal: recipe.meal,
      details: recipe.details,
      image_url: `http://localhost:3333/files/${recipe.image}`,
    };

    return res.json(serializedRecipe);
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
