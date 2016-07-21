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

// create Home component
var Home = React.createClass({
	// state initialized for form queries and results
	getInitialState: function() {
		return {
			userId: null,
			dietId: null,
			reportUpdate: null,
			answers: [[],[],[]],
			dietName: null,
			dietDescription: null,
			dietCreated: null,
			dietImage: null

		}
	},
	// grab profile data
	componentWillMount: function(){
		console.log(this.props);
		helpers.getProfileData()
		.then(function(result){
			var data = result.data;
			return this.setState({
				userId: data.userId,
			})
		}.bind(this));
	},
	// componentDidUpdate: grab articles whenever update comes in
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
				<div id="homepage" className="text-center">
	        
	            <div className="col-md-12 content top">
	                
	            
	                <img className="logobig" src="./assets/images/esallogobig.svg" id="logobigsvg" />
	                <div><span id="arrow"><a href="#about" className="fa fa-angle-double-down"></a></span></div>
	            </div>
	    	</div>
	    	<div id="about">
		    	<div className="col-md-4 aboutContainer">
		    		<div className="fbox">
		    		<div className="ficon iconOne"><i className="fa fa-user" aria-hidden="true"></i></div>
		    		</div>
		    		<h1 className="aboutTitle" id="sectionOne">User Data</h1>
		    		<p className="aboutCopy">
		    		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra luctus risus nec gravida. Sed eget ornare magna. Sed ut imperdiet augue. Maecenas sed congue purus. Curabitur efficitur aliquet mi, eget maximus quam lacinia ac. Aliquam erat volutpat. Fusce sed convallis nulla.
		    		</p>
		    		
		    	</div>
		    	<div className="col-md-4 aboutContainer">
		    		<div className="fbox">
		    		<div className="ficon iconTwo"><i className="fa fa-line-chart" aria-hidden="true"></i></div>
		    		</div>
		    		<h1 className="aboutTitle" id="sectionTwo">Analytics</h1>
		    		<p className="aboutCopy">
		    		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra luctus risus nec gravida. Sed eget ornare magna. Sed ut imperdiet augue. Maecenas sed congue purus. Curabitur efficitur aliquet mi, eget maximus quam lacinia ac. Aliquam erat volutpat. Fusce sed convallis nulla.
		    		</p>

		    	</div>
		    	<div className="col-md-4 aboutContainer">
		    		<div className="fbox">
		    		<div className="ficon iconThree"><i className="fa fa-calendar" aria-hidden="true"></i></div>
		    		</div>
		    		<h1 className="aboutTitle"id="sectionThree">Reminders</h1>
		    		<p className="aboutCopy">
		    		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra luctus risus nec gravida. Sed eget ornare magna. Sed ut imperdiet augue. Maecenas sed congue purus. Curabitur efficitur aliquet mi, eget maximus quam lacinia ac. Aliquam erat volutpat. Fusce sed convallis nulla.
		    		</p>
		    		
		    	</div>
			</div>
			
			<div id="topDietContainer" className="row text-center">
			<div className="col-md-12 col-xs-12">
			<h1 className="topDietsTitle text-center" id="topDietsTitle">Top Diets</h1>
			</div>
		    	<div className="col-md-6 dietPadding">
		    	<div className="dietbox">
		    		<h2 className="dietTitle">2 Bannana Diet</h2>
		    		<img src="./assets/images/dietOne.png" className="smDietImg" alt="2 Bannana Diet"/>
		    		<p className="dietCopy">
		    		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra luctus risus nec gravida.</p>
		    	</div>
		    	</div>
		    	<div className="col-md-6 dietPadding">
		    	<div className="dietbox">
		    		<h2 className="dietTitle">All Kale Diet</h2>
		    		<img src="./assets/images/dietTwo.png" className="smDietImg" alt="All Kale Diet"/>
		    		<p className="dietCopy">
		    		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra luctus risus nec gravida.</p>
		    	</div>
		    	</div>
		    	<div className="col-md-6 dietPadding">
		    	<div className="dietbox">
		    		<h2 className="dietTitle">Nothing but Berries</h2>
		    		<img src="./assets/images/dietThree.png" className="smDietImg" alt="Nothing but Berries"/>
		    		<p className="dietCopy">
		    		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra luctus risus nec gravida.</p>
		    	</div>
		    	</div>
		    	<div className="col-md-6 dietPadding">
		    	<div className="dietbox">
		    		<h2 className="dietTitle">Salmon and Potato Diet</h2>
		    		<img src="./assets/images/dietFour.png" className="smDietImg" alt="Salmon and Potato Diet"/>
		    		<p className="dietCopy">
		    		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra luctus risus nec gravida.</p>
		    	</div>
		    	</div>
		    	<div className="col-md-6 dietPadding">
		    	<div className="dietbox">
		    		<h2 className="dietTitle">Lotus Root Diet</h2>
		    		<img src="./assets/images/dietFive.png" className="smDietImg" alt="Lotus Root Diet"/>
		    		<p className="dietCopy">
		    		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra luctus risus nec gravida.</p>
		    	</div>
		    	</div>
		    	<div className="col-md-6 dietPadding">
		    	<div className="dietbox">
		    		<h2 className="dietTitle">Lemon Water Diet</h2>
		    		<img src="./assets/images/dietSix.png" className="smDietImg" alt="Lemon Water Diet"/>
		    		<p className="dietCopy">
		    		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra luctus risus nec gravida.</p>
		    	</div>
		    	</div>
			</div>
			</div>
			
		)
	}
})

module.exports = Home;