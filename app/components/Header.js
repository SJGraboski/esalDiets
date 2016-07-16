// Header Component
// =================

// dependencies
var React = require('react');
var Router = require('react-router');

var App = React.createClass({
	// state initialized for form queries and results
	getInitialState: function() {
		return {
			// user info
			}
	},
	// render function
	render: function() {
		function whatPage() {
			if (this.state.diet.active){
				return (<Diet diet={this.state.diet} userSubscribe={this.userSubscribe} />)
			}
			if (this.state.user.active) {
				return (<Profile user={this.state.user} />)
			}
			else {
				return (<Home />)
			}
		}
		return (
			<Header query={this.updateSearch} userButton={this.userPage} />
			{whatPage()}
		)
})
