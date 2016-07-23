// Home page
// ==========

// dependencies
var React = require('react');
var Router = require('react-router');

// get components
var Calendar = require('./Calendar/Calendar.js');
var MoodGraph = require('./MoodGraph.js');
var EnergyGraph = require('./EnergyGraph.js');
var WeightGraph = require('./WeightGraph.js');

// PropTypes
var PropTypes = React.PropTypes;


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
	// render function
	render: function() {
		return (
			<div>
				<div id="homepage" className="text-center">
	        
	            <div className="col-md-12 content top">
	                
	            
	                <img className="logobig" src="./assets/images/esallogobig.svg" id="logobigsvg" />
	                <div><span id="arrow"><a href="#about" className="fa fa-angle-double-down smooth"></a></span></div>
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