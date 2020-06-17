import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Recipe from '../pages/Recipe';
import AddRecipe from '../pages/AddRecipe';
import LikedRecipes from '../pages/LikedRecipes';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />

      <Route path="/recipe/new" exact component={AddRecipe} />
      <Route path="/recipe/:recipe+" component={Recipe} />
      <Route path="/liked" component={LikedRecipes} />
    </Switch>
  );
};

export default Routes;
