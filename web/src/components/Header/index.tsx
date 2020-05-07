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

      <a href="#!" className="button">
        send a recipe
      </a>
    </Container>
  );
};

export default Header;
