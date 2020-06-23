import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { Container, Main, Recipes } from './styles';

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

  return (
    <Container>
      <Header />

      <Main>
        <h1>Your liked recipes.</h1>
      </Main>

      <Recipes id="recipes">
        {recipes.map(recipe => (
          <div key={recipe.id}>
            <img src={recipe.image_url} alt={recipe.title} />

            <h2>{recipe.title}</h2>

            <p>
              <Truncate lines={4}>{recipe.description}</Truncate>
            </p>

            <Link to={`/recipe/${recipe.id}`}>show more</Link>
          </div>
        ))}
      </Recipes>

      <Footer />
    </Container>
  );
};

export default LikedRecipes;
