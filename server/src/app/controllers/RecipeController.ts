import fs from 'fs';
import { Request, Response } from 'express';
import aws from 'aws-sdk';

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
        image_url:
          process.env.STORAGE_TYPE === 'local'
            ? `${process.env.APP_URL}files/${recipe.image}`
            : `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${recipe.image}`,
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
      image_url:
        process.env.STORAGE_TYPE === 'local'
          ? `${process.env.APP_URL}files/${recipe.image}`
          : `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${recipe.image}`,
    };

    return res.json(serializedRecipe);
  }

  async create(req: Request, res: Response) {
    const image = req.file.key;

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
      image_url:
        process.env.STORAGE_TYPE === 'local'
          ? `${process.env.APP_URL}files/${recipe.image}`
          : req.file.location,
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
      switch (process.env.STORAGE_TYPE) {
        case 'local': {
          const uploadFolder = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'uploads',
          );

          await fs.promises.unlink(`${uploadFolder}/${recipe.image}`);

          break;
        }
        default: {
          await new aws.S3({
            region: process.env.AWS_DEFAULT_REGION || 'us-east-1',
          })
            .deleteObject({
              Bucket: process.env.AWS_BUCKET_NAME || '',
              Key: recipe.image,
            })
            .promise();
        }
      }

      await Recipe.update(
        { _id: id },
        {
          $set: {
            image: req.file.key,
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

    switch (process.env.STORAGE_TYPE) {
      case 'local': {
        const uploadFolder = path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'uploads',
        );

        fs.promises.unlink(`${uploadFolder}/${recipe.image}`);

        break;
      }
      default: {
        await new aws.S3({
          region: process.env.AWS_DEFAULT_REGION || 'us-east-1',
        })
          .deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: recipe.image,
          })
          .promise();
      }
    }

    await Recipe.deleteOne({ _id: recipe.id });

    return res.send();
  }
}

export default new RecipeController();
