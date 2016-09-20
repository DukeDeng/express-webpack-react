import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import Login from '../login.jsx';
import Register from '../register.jsx';
import Main from '../main.jsx';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={Main} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
