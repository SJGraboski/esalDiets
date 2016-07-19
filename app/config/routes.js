var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;

// our page components
import App from '../components/App';
import Profile from '../components/Profile';
import Home from '../components/Home';
import Diet from '../components/Diet';

import Login from '../components/Login';
import auth from '../utils/authentication.js';

// our security components
// import Login from './components/Login';
// import LoginRequired from './util/RouteHelpers';

module.exports = (
  <Route path ="/" component={App}>
    <IndexRoute component={Login} />
    <Route component={Diet} name="Diet" path="diet/:dietId" />
    <Route component={Profile} name="Profile" path="profile" />
  </Route>
);