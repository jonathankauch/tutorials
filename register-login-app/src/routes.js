import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App.js';
import Greeting from './components/Greeting.js';
import SignupPage from './components/SignupPage.js';
import LoginPage from './components/LoginPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Greeting} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
  </Route>
);
