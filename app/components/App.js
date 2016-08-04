// App
// ===
var React = require('react');
var helpers = require('../utils/helpers.js');
var Navigation = require('react-router').Navigation;
var Link = require('react-router').Link;
var _ = require('lodash');
var PropTypes = React.PropTypes;
var SearchBar = require('./Diets/SearchBar');
var DietList = require('./Diets/DietList');



// Auth code
var Login = require('../components/Login');
var auth = require('../utils/authentication.js');
var eventManager = require('../utils/event_manager');

// create main container app
var App = React.createClass({

	getInitialState: function(){
		return {
			answers: [[],[],[]],
			dietName: null,
			dietDescription: null,
			dietCreated: null,
			dietImage: null,
			diets: [],
			selectedDiet: null,
			query: '',
			loggedIn: false,
			userId: null,
			username: false,
			dietId: null
		}
	},

	// handle search query
	searchQuery: function(term) {
		var self = this;
		helpers.getSearchResults(term)
		.then(function(diets){
			if (term == '') {
				self.setState({
					diets: null,
					query: term
				})
			}
			else{
				self.setState({
				diets: diets.data,
				selectedDiet: diets.data[0],
				query: term
			});
			}
		})
	},

	// Whenever a diet is searched, change to the diet page
	componentDidUpdate: function(prevProps, prevState) {
		if (prevState.selectedDiet != this.state.selectedDiet) {
			this.context.router.push({pathname: '/diet/' + this.state.selectedDiet.id});
		}
	},

	// For login event listener
	updateAuth: function(loggedIn, resp) {
		console.log(loggedIn);
		console.log('userId ' + resp.data.userId);
    this.setState({
      loggedIn: loggedIn,
      userId: resp.data.userId
    })
  },

	// Call this whenever the user clicks Logout
	logOut: function() {
		// authenticate logout
		auth.logout( (loggedOut) => {
			// if we logout the user
			if (loggedOut) {
				console.log("Logged Out!");
				this.setState({
					loggedIn: false,
					userId: null
				})
				// send us to their profile page
				this.context.router.push({pathname: '/'})
			}
		})
	},

  componentDidMount: function () {
    this.subscription = eventManager.getEmitter().addListener(eventManager.authChannel, this.updateAuth);
    var promise = auth.isAuthenticated();
    promise.then(resp => {
    	// check if log in gets us in
    	console.log("Logged In! UserID is " + resp.data.userId);
    	console.log(resp);
    	return this.setState({
    		loggedIn: true,
    		userId: resp.data.userId
	  	})
    })
    .catch(err => {
    	return this.setState({
    		loggedIn: false
    	})
    });
  },

  componentWillUnmount: function () {
    this.subscription.remove();
  },

	// main component app. Takes in the other routes
	render: function() {
		const searchQuery = _.debounce((term) => { this.searchQuery(term)}, 300);

		return (
			<div>
			<div className="container" id="main">
				<div className={this.props.location.pathname === "/" && ("hideIt")} >  
				<header className="masthead">
				  <div className="container">
				  <div className="row">
				    <div className="pagebanner">
				      <img className="img-responsive" src="./assets/images/esalBanner.png" id="profilepagebanner" />
				    </div>
				  </div>
				  </div>
				</header>
				</div>

				<div className="nav-wrapper">
				<div 
					id="nav" 
				>
					<nav className="navbar navbar-default navbar-static">
				  			<div className="container">


							    <div className="navbar-header">
							      <a className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							        <span className="sr-only">Toggle navigation</span>
							        <span className="icon-bar"></span>
							        <span className="icon-bar"></span>
							        <span className="icon-bar"></span>
							      </a>
							      <a href="#" className="navbar-left"><img className="navbar-left" src="./assets/images/esallogosmall.png" id="navlogo" /></a>
							    </div>


							    <div className="navbar-collapse collapse">

				      {!this.state.loggedIn && 
				      	(
				      		<ul className="nav navbar-nav navbar-right icon">
				      			<li><Link to="/login"><i className="fa fa-sign-in" aria-hidden="true"></i>Log In</Link></li>
				      			<li><Link to="/register"><i className="fa fa-user-plus" aria-hidden="true"></i>Register</Link></li>
				      		</ul>
			      		)
				      }
				      {this.state.loggedIn &&
				      	(
			      			<ul className="nav navbar-nav navbar-right icon">
				      			<li><Link to="/profile"><i className="fa fa-user" aria-hidden="true"></i>Profile</Link></li>
				      			<li><a href='#' onClick={this.logOut}><i className="fa fa-sign-out" aria-hidden="true"></i>Sign Out</a></li>
				      		</ul>
				      	)
				      }
				    	<SearchBar onSearch={searchQuery} />
							    </div>

							  </div>
							</nav>
				</div>
				</div>
				</div>



			<div className="container" id="childrenContainer">
				<DietList
					onDietSelect={selectedDiet => this.setState({selectedDiet}) }
					diets={this.state.diets} />
				{React.cloneElement(this.props.children, 
					{
				 		loggedIn: this.state.loggedIn,
				 		userId: this.state.userId,
				 		selectedDiet: this.state.selectedDiet
					}
				)}
			</div>
			<div id="placeholder"></div>
			<div className="container">
			<div className="footer" id="footer">
			<div id="footerLeft">
			<img src="./assets/images/footerlogo.svg" className="footerlogo" alt="esal"/>
			<p className="footerText">Copyrights © 2016 All Rights Reserved by EASL.</p>
			<p className="footerText">Terms of Use / Privacy Policy</p>
			</div>
			<div id="footerRight">
				<div className="fboxFooter">
		    		<div className="footericon"><i className="fa fa-facebook" aria-hidden="true"></i></div>
		    	</div>
		    	<div className="fboxFooter">
		    		<div className="footericon"><i className="fa fa-instagram" aria-hidden="true"></i></div>
		    	</div>
		    	<div className="fboxFooter">
		    		<div className="footericon"><i className="fa fa-pinterest-p" aria-hidden="true"></i></div>
		    	</div>
		    	<div className="fboxFooter">
		    		<div className="footericon"><i className="fa fa-twitter" aria-hidden="true"></i></div>
		    	</div>
		    	<div className="footerTextRight"><p className="footerText"><i className="fa fa-envelope-o" aria-hidden="true"></i> info@easldiets.com</p></div>
			</div>
			</div>
			</div>
			</div>
		)
	}
})

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

// export, where config/router will require it.
module.exports = App;