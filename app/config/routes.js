var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;

// our page components
import App from '../components/App';
import Profile from '../components/Profile';
import Home from '../components/Home';
import Diet from '../components/Diet';

// our security components
// import Login from './components/Login';
// import LoginRequired from './util/RouteHelpers';

module.exports = (
  <Route path ="/" component={App}>
    <IndexRoute component={Profile} />
    <Route component={Home} name="Home" path="home" />
    <Route component={Diet} name="Diet" path="diet" />
    <Route component={Profile} name="Profile" path="profile" />

  </Route>
);