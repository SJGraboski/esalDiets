// react routes
// ============

// dependencies
var React = require('react');

// bring in our components
var components = require('../components');

// We will then pull the router 
var Router = require('react-router');
var Route = Router.Route;

//  This is the catchall route
var IndexRoute	= Router.IndexRoute;

module.exports = (
	// When a user goes to root they will be served the App component
	<Route path="/" component={components.App}>
	
		{/* If user selects the saved path we get the saved component*/}
			<Route path="/Profile" component={components.Profile} />


		{/*If user selects any other path we get the query route*/}
				<IndexRoute component={components.Profile} />

	</Route>
);
