import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';

import api from '../../services/api';

import foodIllustration from '../../assets/food-illustration.svg';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { Container, Main, Recipes } from './styles';

export interface Recipe {
  _id: string;
  title: string;
  meal: string;
  difficulty: string;
  details: string;
  image: string;
}

const Dashboard: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const recipesLocal = localStorage.getItem('@FoodCourt:Recipes');

    if (recipesLocal) {
      return JSON.parse(recipesLocal);
    }

    return [] as Recipe[];
  });

  useEffect(() => {
    async function loadData(): Promise<void> {
      const response = await api.get('recipes');

      localStorage.setItem('@FoodCourt:Recipes', JSON.stringify(response.data));

      setRecipes(response.data);
    }

    loadData();
  }, []);

  console.log(recipes);

  return (
    <Container>
      <Header />

      <Main>
        <div>
          <h1>
            <span>Biggest list of the</span>
            <br />
            Best Recipes
          </h1>

          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </p>

          <a href="#recipes" className="button">
            show the list
          </a>
        </div>

        <img src={foodIllustration} alt="Food Illustration" />
      </Main>

      <Recipes id="recipes">
        {recipes.map(recipe => (
          <div key={recipe._id}>
            <img src={recipe.image} alt={recipe.title} />

            <span>{recipe.difficulty}</span>

            <h2>{recipe.title}</h2>

            <p>
              <Truncate lines={4}>{recipe.details}</Truncate>
            </p>

            <Link to={`/recipe/${recipe._id}`} className="button">
              show more
            </Link>
          </div>
        ))}
      </Recipes>

      <Footer />
    </Container>
  );
};

export default Dashboard;
