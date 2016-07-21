// Header Component
// =================

// dependencies
var React = require('react');
var Router = require('react-router');

var App = React.createClass({
	// state initialized for form queries and results
	getInitialState: function() {
		return {
			dietId: null,
			answers: [[],[],[]],
			dietName: null,
			dietDescription: null,
			dietCreated: null,
			dietImage: null
		}
	},
	// render function
	render: function() {
		return (
			<div><h1>Header</h1></div>
		)
	}
})
