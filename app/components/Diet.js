// Diet page
// ==========

// dependencies
var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;


// get components
var Calendar = require('./Calendar/Calendar.js');
var MoodGraph = require('./MoodGraph.js');
var EnergyGraph = require('./EnergyGraph.js');
var WeightGraph = require('./WeightGraph.js');
var SearchBar = require('react-search-bar');

const matches = {
	'macbook a': [
		'macbook air 13 case',
		'macbook air 11 case',
		'macbook air charger'
	],
	'macbook p': [
		'macbook pro 13 case',
		'macbook pro 15 case',
		'macbook pro charger'
	]
};



// helpers functions
var helpers = require('../utils/helpers.js');

// create Diet component
var Diet = React.createClass({
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

  componentWillReceiveProps: function(nextProps){
  	helpers.getDietData(nextProps.params.dietId)
		.then(function(result){
			var data = result.data;
			return this.setState({
				dietId: nextProps.params.dietId,
				dietName: data.name,
				answers: data.answers
			})
		}.bind(this));
  },

	// grab Diet data
	componentWillMount: function(){
		helpers.getDietData(this.props.params.dietId)
		.then(function(result){
			var data = result.data;
			return this.setState({
				dietId: this.props.params.dietId,
				dietName: data.name,
				answers: data.answers
			})
		}.bind(this));
	},
	// set Query to inputs
	updateQuery: function(newAnswers){
		// set the state to the for inputs
		this.setState({
			reportUpdate: newAnswers,
		});
	},
	onChange(input, resolve) {
		// Simulate AJAX request
		setTimeout(() => {
			const suggestions = matches[Object.keys(matches).find((partial) => {
					return input.match(new RegExp(partial), 'i');
				})] || ['macbook', 'macbook air', 'macbook pro'];

			resolve(suggestions.filter((suggestion) =>
				suggestion.match(new RegExp('^' + input.replace(/\W\s/g, ''), 'i'))
			));
		}, 25);
	},
	onSearch(input) {
		if (!input) return;
		console.info(`Searching "${input}"`);
		// run the search query
		helpers.getSearchResults(input)
		.then(function(results){
			console.log(results);
		})
	},
	// render function
	render: function() {
		return (
			<div>
			<div className="container">
			<div className="col-md-12">
			<h1 className="dietPageName">Diet Name Goes Here</h1>
			</div>
			</div>
			<div className="row graphContainer">
			<div className="placeholderspace" id="placeholderspace"></div>
			<div className="col-md-12" id="analytics">
				<MoodGraph mood={this.state.answers[0]} />
				<EnergyGraph energy={this.state.answers[1]} />
				<WeightGraph weight={this.state.answers[2]} />
			</div>
			<div className="col-md-12" id="userdata">
			</div>
			</div>
			</div>
		)
	}
})

module.exports = Diet;