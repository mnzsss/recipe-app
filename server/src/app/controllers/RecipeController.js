import fs from 'fs';
import path from 'path';
import Recipe from '../schemas/Recipe';
import File from '../schemas/File';

class RecipeController {
  async index(req, res) {
    const recipes = await Recipe.find();

    return res.json(recipes);
  }

  async show(req, res) {
    const { recipe_id } = req.params;

    const recipe = await Recipe.findById(recipe_id);

    return res.json(recipe);
  }

  async create(req, res) {
    const { title, meal, difficulty, details } = req.body;

    const recipe = await Recipe.create({ title, meal, difficulty, details });

    return res.json(recipe);
  }

  async update(req, res) {
    const { image_id, recipe_id } = req.body;

    const recipe = await Recipe.findById(recipe_id);
    const image = await File.findById(image_id);

    await recipe.update({ image: image.path });

    return res.json(recipe);
  }

  async delete(req, res) {
    const { recipe_id } = req.params;

    const recipe = await Recipe.findById(recipe_id);
    const file = await File.findOne({
      $where: () => {
        return this.path === recipe.image;
      },
    });

    const uploadFolder = path.resolve(__dirname, '..', '..', '..', 'uploads');

    fs.promises.unlink(`${uploadFolder}/${file.hash_name}`);

    await File.deleteOne({
      $where: () => {
        return this.path === recipe.image;
      },
    });

    await Recipe.deleteOne({ _id: recipe.id });

    return res.send();
  }
}

export default new RecipeController();
