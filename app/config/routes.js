var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;

// our page components
import App from '../components/App';
import Profile from '../components/Profile';

// our security components
// import Login from './components/Login';
// import LoginRequired from './util/RouteHelpers';

module.exports = (
  <Route path ="/" component={App}>
    <IndexRoute component={Profile} />
    <Route component={Profile} name="Profile" path="/graph" />
  </Route>
);