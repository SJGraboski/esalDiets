// App
// ===
var React = require('react');
var helpers = require('../utils/helpers.js');
var Navigation = require('react-router').Navigation;

// Auth
import Login from '../components/Login';
import auth from '../utils/authentication.js';
import eventManager from '../utils/event_manager';


var SearchBar = require('./Diets/SearchBar.js');

var App = React.createClass({

	getInitialState: function(){
		return {
			searchQuery: null,
			loggedIn: false
		}
	},

	updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentDidMount () {
    this.subscription = eventManager.getEmitter().addListener(eventManager.authChannel, this.updateAuth);
    const promise = auth.isAuthenticated();
    promise.then(resp => {this.setState({loggedIn: true})})
      .catch(err => {this.setState({loggedIn: false})});
    console.log(this.state);
  },

  componentWillUnmount () {
    this.subscription.remove();
  },

	searchQuery: function(term){
		helpers.getSearchResults(term)
		.then(function(results){
			console.log(results);
		})
	},
	// Allow for transitions between elements.
	mixins: [Navigation],

	offset: function(){
		if (this.props.location.pathname === "/") {
			return "0";
		}
	},


	// main component app. Takes in the other routes
	render: function() {
		return (
			<div>
			<div className="container" id="main">
				<div className={this.props.location.pathname === "/" && ("hideIt")} >  
				<header className="masthead">
				  <div className="container">
				  <div className="row">
				    <div className="pagebanner">
				      <img src="./assets/images/esalBanner.png" id="profilepagebanner" />
				    </div>
				  </div>
				  </div>
				</header>
				</div>

				<div className="nav-wrapper">
				<div 
					id="nav" 
					data-spy="affix"
					data-offset-top={this.offset()}
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
							    <ul className="nav navbar-nav navbar-right icon">
				      <li><a href="#analytics"><i className="fa fa-line-chart" aria-hidden="true"></i> Analytics</a></li>
				      <li><a href="#userdata"><i className="fa fa-user" aria-hidden="true"></i> User Data</a></li>
				    </ul>
				    	<SearchBar onSearchTermChange={this.searchQuery} />
							    </div>

							  </div>
							</nav>
				</div>
				</div>
				</div>



			<div className="container" id="childrenContainer">
				{React.cloneElement(this.props.children, { loggedIn: this.state.loggedIn })}
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

// export, where config/router will require it.
module.exports = App;