// Home page
// ==========

// dependencies
var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;


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
	                
	            
	                <img className="logobig img-responsive" src="./assets/images/esallogobig.svg" id="logobigsvg" />
	                <div><span id="arrow"><a href="#about" className="fa fa-angle-double-down smooth"></a></span></div>
	            </div>
	    	</div>
	    	<div id="about" className="row">
		    	<div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-0 aboutContainer">
		    		<div className="fbox">
		    		<div className="ficon iconOne"><i className="fa fa-user" aria-hidden="true"></i></div>
		    		</div>
		    		<h1 className="aboutTitle" id="sectionOne">User Data</h1>
		    		<p className="aboutCopy">
							Sign up for Esal and subscribe to any of the diets in our catalog. Fill out a quick survey each day and use our data visualizations to track your progress. Not satisfied with your current regimen? Subscribe to a new one, no questions asked!
		    		</p>
		    		
		    	</div>
		    	<div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-0 aboutContainer">
		    		<div className="fbox">
		    		<div className="ficon iconTwo"><i className="fa fa-line-chart" aria-hidden="true"></i></div>
		    		</div>
		    		<h1 className="aboutTitle" id="sectionTwo">Analytics</h1>
		    		<p className="aboutCopy">
							Worried the latest trendy diet is all bluster? Each plan in our catalog features line graphs depicting the results for the average user over 28 days. Esal will aggregate data from the diet’s subscribers. No fluff here&mdash;just real statistics. 
		    		</p>

		    	</div>
		    	<div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-0 aboutContainer">
		    		<div className="fbox">
		    		<div className="ficon iconThree"><i className="fa fa-calendar" aria-hidden="true"></i></div>
		    		</div>
		    		<h1 className="aboutTitle"id="sectionThree">Reminders</h1>
		    		<p className="aboutCopy">
							The Esal Team plans to let users opt into daily emails and text messages—these will remind our subscribers to fill out their daily reports. We want to ensure that our supporters get everything they can out of our service.	
			    	</p>
		    		
		    	</div>
			</div>
			
			<div id="topDietContainer" className="row text-center">
			<div className="col-md-12 col-xs-12">
			<h1 className="topDietsTitle text-center" id="topDietsTitle">Top Diets</h1>
			</div>
		    	<Link to="/diet/31" className="col-md-6 dietPadding">
		    	<div to="/diet/31" className="dietbox">
		    		<h2 className="dietTitle">Salmon and Potato Diet</h2>
		    		<img src="./assets/images/dietFour.png" className="smDietImg" alt="Salmon and Potato Diet"/>
		    		<p className="dietCopy">
		    			Salmon is packed with lean protein. Potatoes contain lots of fiber. Sounds like a well-rounded plate to us!
		    		</p>
		    	</div>
		    	</Link>
		    	<Link to="/diet/33" className="col-md-6 dietPadding">
		    	<div className="dietbox">
		    		<h2 className="dietTitle">All Kale Diet</h2>
		    		<img src="./assets/images/dietTwo.png" className="smDietImg" alt="All Kale Diet"/>
		    		<p className="dietCopy">
		    			Kale's all the rage lately, and for good reason. Packed with fiber and protein, this vegetable deserves a spot in your diet.
		    		</p>
		    	</div>
		    	</Link>
		    	<Link to="/diet/30" className="col-md-6 dietPadding">
		    	<div className="dietbox">
		    		<h2 className="dietTitle">Nothing but Berries</h2>
		    		<img src="./assets/images/dietThree.png" className="smDietImg" alt="Nothing but Berries"/>
		    		<p className="dietCopy">
		    			Juicing's great and all, but why not let your body break down the fiber instead of your blender? Just straight-up whole fruits here!
		    		</p>
		    	</div>
		    	</Link>
		    	<Link to="/diet/1" className="col-md-6 dietPadding">
		    	<div className="dietbox">
		    		<h2 className="dietTitle">2 Bannana Diet</h2>
		    		<img src="./assets/images/dietOne.png" className="smDietImg" alt="2 Bannana Diet"/>
		    		<p className="dietCopy">
		    			The trending diet of the moment! Fantastic for weight loss, if you're willing to risk regularly passing out (i.e., don't actually take this diet).
		    		</p>
		    	</div>
		    	</Link>
		    	<Link to="/diet/34" className="col-md-6 dietPadding">
		    	<div className="dietbox">
		    		<h2 className="dietTitle">Lotus Root Diet</h2>
		    		<img src="./assets/images/dietFive.png" className="smDietImg" alt="Lotus Root Diet"/>
		    		<p className="dietCopy">
		    			Rich in fiber with a modest calorie count, lotus roots will surely fill out your vegetable quota.
		    		</p>
		    	</div>
		    	</Link>
		    	<Link to="/diet/35" className="col-md-6 dietPadding">
		    	<div className="dietbox">
		    		<h2 className="dietTitle">Lemon Water Diet</h2>
		    		<img src="./assets/images/dietSix.png" className="smDietImg" alt="Lemon Water Diet"/>
		    		<p className="dietCopy">
		    			Can lemon water truly boost your energy and mood? Will it help you lose weight? Check our stats and find out!
		    		</p>
		    	</div>
		    	</Link>
			</div>
			</div>
			
		)
	}
})

module.exports = Home;