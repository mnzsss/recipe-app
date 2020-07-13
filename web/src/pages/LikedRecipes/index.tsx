import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import { GiOpenedFoodCan } from 'react-icons/gi';
import { FiTrash2 } from 'react-icons/fi';

import { Recipe as RecipeProps } from '../Dashboard';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { Container, Main, Recipes, NoContent, Remove } from './styles';

export interface Recipe {
  id: string;
  title: string;
  difficulty: number;
  description: string;
  ingredients: string[];
  prepare_mode: string;
  image_url: string;
}

const LikedRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const localRecipes = localStorage.getItem('@FoodCourt:Liked');

    if (localRecipes) {
      const data = JSON.parse(localRecipes);
      setRecipes(data);
    }
  }, []);

  const handleRemoveLikeRecipe = useCallback((id: string) => {
    let rcps: RecipeProps[] = [];

    const storagedRecipes = localStorage.getItem('@FoodCourt:Liked');

    if (storagedRecipes) {
      rcps = JSON.parse(storagedRecipes);
    }

    rcps = rcps.filter(rcp => rcp.id !== id);

    setRecipes(rcps);

    localStorage.setItem('@FoodCourt:Liked', JSON.stringify(rcps));
  }, []);

  return (
    <Container>
      <Header />

      <Main>
        <h1>Your liked recipes.</h1>
      </Main>

      {recipes.length > 0 ? (
        <Recipes id="recipes">
          {recipes.map(recipe => (
            <div key={recipe.id}>
              <Remove onClick={() => handleRemoveLikeRecipe(recipe.id)}>
                <span>remove ?</span>

                <FiTrash2 size={15} color="#fff" />
              </Remove>
              <img src={recipe.image_url} alt={recipe.title} />

              <h2>{recipe.title}</h2>

              <p>
                <Truncate lines={4}>{recipe.description}</Truncate>
              </p>

              <Link to={`/recipe/${recipe.id}`}>show more</Link>
            </div>
          ))}
        </Recipes>
      ) : (
        <NoContent>
          <GiOpenedFoodCan size={80} color="#ccc" />
          <span>what a pity! you haven't favored any recipes yet</span>
        </NoContent>
      )}

      <Footer />
    </Container>
  );
};

export default LikedRecipes;
