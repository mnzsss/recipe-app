import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import Skeleton from '@material-ui/lab/Skeleton';

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
            Find and share everyday cooking inspiration on Allrecipes. Discover
            recipes, cooks, videos, and how-tos based on the food you love and
            the friends you follow.
          </p>

          <a href="#recipes" className="button">
            show the list
          </a>
        </div>

        <img src={foodIllustration} alt="Food Illustration" />
      </Main>

      {recipes.length > 0 ? (
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
      ) : (
        <Recipes id="recipes">
          <div>
            <Skeleton height={250} animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton height={50} animation="wave" />
          </div>
          <div>
            <Skeleton height={250} animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton height={50} animation="wave" />
          </div>
          <div>
            <Skeleton height={250} animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton height={50} animation="wave" />
          </div>
        </Recipes>
      )}

      <Footer />
    </Container>
  );
};

export default Dashboard;
