import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import RecipeController from './app/controllers/RecipeController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/recipes', RecipeController.index);
routes.get('/recipes/:recipe_id', RecipeController.show);
routes.post('/recipes', RecipeController.create);
routes.put('/recipes', RecipeController.update);
routes.delete('/recipes/:recipe_id', RecipeController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
