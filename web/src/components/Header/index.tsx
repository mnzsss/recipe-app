import React from 'react';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="FoodCourt" />
      </Link>

      <Link to="/recipe/new" className="button">
        send a recipe
      </Link>
    </Container>
  );
};

export default Header;
