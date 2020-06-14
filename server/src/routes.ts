import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import RecipeController from './app/controllers/RecipeController';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/recipes', upload.single('file'), RecipeController.create);
routes.get('/recipes', RecipeController.index);
routes.get('/recipes/:id', RecipeController.show);
routes.put('/recipes/:id', upload.single('file'), RecipeController.update);
routes.delete('/recipes/:id', RecipeController.delete);

export default routes;
