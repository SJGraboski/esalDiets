// Profile page
// ==========

// dependencies
var React = require('react');
var Router = require('react-router');

var PropTypes = React.PropTypes;


// get components
var Calendar = require('./Calendar/Calendar.js');
var MoodGraph = require('./MoodGraph.js');
var EnergyGraph = require('./EnergyGraph.js');
var WeightGraph = require('./WeightGraph.js');

// helpers functions
var helpers = require('../utils/helpers.js');

// authentication
var auth = require('../utils/authentication.js');

// create Profile component
var Profile = React.createClass({
	// state initialized for form queries and results
	getInitialState: function() {
		return {
			userId: null,
			dietId: null,
			dietName: "Start One Today!",
			reportId: null,
			answered: null,
			startDay: null,
			reportUpdate: null,
			answers: [[],[],[]]
		}
	},
	componentDidMount: function(){
		console.log(this.props);
		if(this.props.userId != null) {
			return helpers.getProfileData(this.props.userId)
			.then(function(result){
				var data = result.data;
				console.log(result);
				return this.setState({
					userId: this.props.userId,
					dietId: data.dietId,
					dietName: data.diet.name,
					reportId: data.reportId,
					answered: data.answered,
					startDate: data.startDate,
					answers: data.answers,
					reportUpdate: null
				})
			}.bind(this));
		}
	},
	// componentDidUpdate: grab user info whenever update comes in
	componentDidUpdate: function(prevProps, prevState){
		// check to make sure at least one of the search inputs are different
		if (this.state.reportUpdate != prevState.reportUpdate && this.state.reportUpdate != null){
			// first check that user is logged in
	    var promise = auth.isAuthenticated();
	    // if so, send token, userId and dietId into reportUpdate
	    promise.then(resp => {
				// helpers reportAnswer
				helpers.reportUpdate(this.state.reportUpdate, resp.data.token)
				.then(function(data){
					// check response
					if (data != false) {
						return helpers.getProfileData(this.props.userId)
						.then(function(result){
							var data = result.data;
							return this.setState({
								userId: this.props.userId,
								dietId: this.state.dietId,
								dietName: data.diet.name,
								reportId: data.reportId,
								answered: data.answered,
								startDate: data.startDate,
								answers: data.answers,
								reportUpdate: null
							})
						}.bind(this)); // make "this" function as expected
					}
				}.bind(this)); // make "this" function as expected
			})
		}

		// Handling our userId props
		if (this.props.userId != prevProps.userId && this.props.userId != null) {
			console.log(this.props);
			helpers.getProfileData(this.props.userId)
			.then(function(result){
				var data = result.data;
				console.log(result);
				return this.setState({
					userId: this.props.userId,
					dietId: data.dietId,
					dietName: data.diet.name,
					reportId: data.reportId,
					answered: data.answered,
					startDate: data.startDate,
					answers: data.answers,
					reportUpdate: null
				})
			}.bind(this));
		}
	},
	// set Query to inputs
	updateQuery: function(newAnswers){
		// set the state to the for inputs
		this.setState({
			reportUpdate: newAnswers,
		});
	},
	// how page should look when not logged
	notLoggedIn() {
		return (
			<div>
			<h2>Not logged in</h2>
			<h3>You must be logged in to view a profile page</h3>
			</div>
		)
	},

	loggedIn(){
		return (
			<div className="row graphContainer">
			<div className="placeholderspace" id="placeholderspace"></div>
			<div className="col-md-12" id="analytics">
				<h1 className="profileTitle">Your Current Diet: {this.state.dietName}</h1>
				<MoodGraph mood={this.state.answers[0]} />
				<EnergyGraph energy={this.state.answers[1]} />
				<WeightGraph weight={this.state.answers[2]} />
			</div>
			<div className="col-md-12" id="userdata">
				<Calendar updateQuery={this.updateQuery} startDate={this.state.startDate} reportId={this.state.reportId} answered={this.state.answered} />

			</div>
			</div>
		)
	},
	// render function
	render() {
		return this.props.loggedIn ? this.loggedIn() : this.notLoggedIn()
	}
})

module.exports = Profile;