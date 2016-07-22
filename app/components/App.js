// App
// ===
var React = require('react');
var helpers = require('../utils/helpers.js');
var Navigation = require('react-router').Navigation;
var Link = require('react-router').Link;
import _ from 'lodash';
var PropTypes = React.PropTypes;
var SearchBar = require('./Diets/SearchBar');
var DietList = require('./Diets/DietList');



// Auth
import Login from '../components/Login';
import auth from '../utils/authentication.js';
import eventManager from '../utils/event_manager';

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



	searchQuery(term) {
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

	componentDidUpdate: function(prevProps, prevState) {
		if (prevState.selectedDiet != this.state.selectedDiet) {
			this.context.router.push({pathname: '/diet/' + this.state.selectedDiet.id});
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
    promise.then(resp => {
    	console.log(resp.data);
    	this.setState({
    		loggedIn: true,
	  		userId: resp.data.userId,
	  		userName: resp.data.username,
	  		dietId: resp.data.dietId
    	})
    })
    .catch(err => {
    	this.setState({
    		loggedIn: false
    	})
    });
  },

  componentWillUnmount () {
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
				      <img src="./assets/images/esalBanner.png" id="profilepagebanner" />
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
				      			<li><a href="#analytics"><i className="fa fa-line-chart" aria-hidden="true"></i>Analytics</a></li>
				      			<li><a href="#userdata"><i className="fa fa-line-chart" aria-hidden="true"></i>User Data</a></li>
				      			<li><Link to="login"><i className="fa fa-sign-in" aria-hidden="true"></i>Log In</Link></li>
				      			<li><Link to="/register"><i className="fa fa-user-plus" aria-hidden="true"></i>Register</Link></li>
				      		</ul>
			      		)
				      }
				      {this.state.loggedIn &&
				      	(
			      			<ul className="nav navbar-nav navbar-right icon">
				      			<li><a href="#analytics"><i className="fa fa-line-chart" aria-hidden="true"></i>Analytics</a></li>
				      			<li><a href="#userdata"><i className="fa fa-line-chart" aria-hidden="true"></i>User Data</a></li>
				      			<li><Link to="profile"><i className="fa fa-user" aria-hidden="true"></i>Profile</Link></li>
				      			<li><Link to="logout"><i className="fa fa-sign-out" aria-hidden="true"></i>Sign Out</Link></li>
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
				 		username: this.state.username,
				 		userId: this.state.userId,
				 		dietId: this.state.dietId
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
  router: React.PropTypes.func.isRequired
}

// export, where config/router will require it.
module.exports = App;