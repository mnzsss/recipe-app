import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';

import api from '../../services/api';

import foodIllustration from '../../assets/header-image.png';

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

const Dashboard: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    async function loadData(): Promise<void> {
      const response = await api.get('recipes');

      setRecipes(response.data);
    }

    loadData();
  }, []);

  return (
    <Container>
      <Header />

      <Main>
        <div>
          <h1>Biggest list of the best Recipes</h1>

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

export default Dashboard;
