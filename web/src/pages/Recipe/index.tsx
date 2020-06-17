import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

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
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function loadData(): Promise<void> {
      const rcp = await api.get(`recipes/${params.recipe}`);

      const storagedLike = localStorage.getItem('@FoodCourt:Liked');

      if (storagedLike) {
        const likes: [] = JSON.parse(storagedLike);

        const liked = likes.filter((like: any) => like.id === params.recipe);

        if (liked[0]) {
          setIsLiked(true);
        }
      }

      setRecipe(rcp.data);
    }

    loadData();
  }, [params.recipe]);

  const handleLikeRecipe = useCallback(() => {
    setIsLiked(old => !old);

    let rcps = [];

    const storagedRecipes = localStorage.getItem('@FoodCourt:Liked');

    if (storagedRecipes) {
      rcps = JSON.parse(storagedRecipes);
    }

    rcps.push(recipe);

    localStorage.setItem('@FoodCourt:Liked', JSON.stringify(rcps));
  }, [recipe]);

  return (
    <Container>
      <Header />

      <Link to="/">
        <FiChevronLeft size={14} color="#ea687e" />
        back
      </Link>

      {recipe ? (
        <RecipeContent>
          {recipe.image_url ? (
            <img src={recipe.image_url} alt={recipe.title} />
          ) : (
            <img
              src="https://via.placeholder.com/1200/f5f5f5/ea687e/?text=Loading"
              alt="Loading"
            />
          )}

          <div>
            <span>{recipe.difficulty}</span>

            <h1>{recipe.title}</h1>

            <p>{recipe.description}</p>

            <div className="ingredients">
              <span>Ingredients</span>
              {recipe.ingredients?.map(ingredient => (
                <div key={ingredient}>
                  <input type="checkbox" />
                  <p>{ingredient}</p>
                </div>
              ))}
            </div>

            <p>{recipe.prepare_mode}</p>

            <div className="footer">
              <button type="button" onClick={handleLikeRecipe}>
                {(isLiked && <AiFillHeart size={20} />) || (
                  <AiOutlineHeart size={20} />
                )}
                You like ?
              </button>
            </div>
          </div>
        </RecipeContent>
      ) : (
        <p>Loading...</p>
      )}

      <Footer />
    </Container>
  );
};

export default Recipe;
