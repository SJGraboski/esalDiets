// Now app.js plays the central role of handling routing and is thus the "starting point" in our code.
var React = require('react');
var ReactDOM = require('react-dom');

// Grab the property associated with the Router
var Router = require('react-router').Router;

// We are going to create a routes object 
var routes = require('./config/routes');

ReactDOM.render(
	// routes will tell us which route to go to depending on which route we are looking at 
	<Router>{routes}</Router>,
	document.getElementById('app')
)