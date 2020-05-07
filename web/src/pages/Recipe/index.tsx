import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

import { Recipe as RecipeProps } from '../Dashboard';
import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { Container, RecipeContent } from './styles';

interface RecipeParams {
  recipe: string;
}

const Recipe: React.FC = () => {
  const { params } = useRouteMatch<RecipeParams>();
  const [recipe, setRecipe] = useState<RecipeProps>({} as RecipeProps);

  useEffect(() => {
    async function loadData(): Promise<void> {
      const rcp = await api.get(`recipes/${params.recipe}`);

      setRecipe(rcp.data);
    }

    loadData();
  }, [params.recipe]);

  return (
    <Container>
      <Header />

      <Link to="/">
        <FiChevronLeft size={14} color="#ea687e" />
        back
      </Link>
      <RecipeContent>
        <img src={recipe.image} alt={recipe.title} />

        <div>
          <span>{recipe.difficulty}</span>

          <h1>{recipe.title}</h1>

          <p>{recipe.details}</p>
        </div>
      </RecipeContent>

      <Footer />
    </Container>
  );
};

export default Recipe;
