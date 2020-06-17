import React from 'react';
import { AiFillHeart } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="FoodCourt" />
      </Link>

      <div>
        <Link to="/liked" className="link">
          <AiFillHeart size={20} />
          Your liked recipes
        </Link>

        <Link to="/recipe/new" className="button">
          send a recipe
        </Link>
      </div>
    </Container>
  );
};

export default Header;
