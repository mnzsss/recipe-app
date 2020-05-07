import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Recipe from '../pages/Recipe';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/recipe/:recipe+" component={Recipe} />
    </Switch>
  );
};

export default Routes;
