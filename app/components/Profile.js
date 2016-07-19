// Query page
// ==========

// dependencies
var React = require('react');
var Router = require('react-router');

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

// create Profile component
var Profile = React.createClass({
	// state initialized for form queries and results
	getInitialState: function() {
		return {
			userId: null,
			dietId: null,
			reportId: null,
			answered: null,
			startDay: null,
			reportUpdate: null,
			answers: [[],[],[]]
		}
	},
	componentWillMount: function(){
		helpers.getProfileData()
		.then(function(result){
			var data = result.data;
			return this.setState({
				userId: data.userId,
				dietId: data.dietId,
				reportId: data.reportId,
				answered: data.answered,
				startDate: data.startDate,
				answers: data.answers,
				reportUpdate: null
			})
		}.bind(this));
	},
	// componentDidUpdate: grab user info whenever update comes in
	componentDidUpdate: function(prevProps, prevState){
		// check to make sure at least one of the search inputs are different
		if (this.state.reportUpdate != prevState.reportUpdate && this.state.reportUpdate != null){
			// helpers reportAnswer
			helpers.reportUpdate(this.state.reportUpdate)
			.then(function(data){
				// check response
				if (data != false) {
					return helpers.getProfileData()
					.then(function(result){
						var data = result.data;
						return this.setState({
							userId: data.userId,
							dietId: data.dietId,
							reportId: data.reportId,
							answered: data.answered,
							startDate: data.startDate,
							answers: data.answers,
							reportUpdate: null
						})
					}.bind(this)); // make "this" function as expected)
				}
			}.bind(this)); // make "this" function as expected
		}
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
	},
	// render function
	render: function() {
		return (
			<div className="row graphContainer">
			<div className="placeholderspace" id="placeholderspace"></div>
			<div className="col-md-12" id="analytics">
				<MoodGraph mood={this.state.answers[0]} />
				<EnergyGraph energy={this.state.answers[1]} />
				<WeightGraph weight={this.state.answers[2]} />
			</div>
			<div className="col-md-12" id="userdata">
				<Calendar updateQuery={this.updateQuery} startDate={this.state.startDate} reportId={this.state.reportId} answered={this.state.answered} />

			</div>
			



			</div>
		)
	}
})

module.exports = Profile;