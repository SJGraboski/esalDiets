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
var eventManager = require('../utils/event_manager');

// check if the user is authenticated
function checkAuth(nextState, replace, cb) {
  const promise = authentication.isAuthenticated();
  promise.then(function(resp) {
    eventManager.getEmitter().emit(eventManager.authChannel, true);
    cb();
  }).catch(function(err) {
    eventManager.getEmitter().emit(eventManager.authChannel, false);
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
    cb();
  });
}
module.exports = (
  <Route path ="/" component={App}>
    <IndexRoute component={Login} />
    <Route component={Diet} name="Diet" path="diet/:dietId" />
    <Route component={Profile} name="Profile" path="profile" />
  </Route>
);