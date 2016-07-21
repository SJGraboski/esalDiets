// App
// ===
var React = require('react');
var Navigation = require('react-router').Navigation;
import _ from 'lodash';
import helpers from '../utils/helpers';
var PropTypes = React.PropTypes;
import DietList from './Diets/DietList';
import DietProfile from './Diets/DietProfile';



// bring in the search bar
var SearchBar = require('./Diets/SearchBar.js');

var App = React.createClass({

	getInitialState: function() {
		return {
			dietId: null,
			answers: [[],[],[]],
			dietName: null,
			dietDescription: null,
			dietCreated: null,
			dietImage: null,
			diets: [],
			selectedDiet: null
		}
	},


	dietSearch(term) {

		var self = this;
		helpers.getSearchResults(term)
		.then(function(diets){
			self.setState({
				diets: diets.data,
				selectedDiet: diets.data[0]
			});
			console.log(self.state.diets)
			console.log(self.state.selectedDiet)
		})
	},

	// Allow for transitions between elements.
	mixins: [Navigation],


	// main component app. Takes in the other routes
	render: function() {
		const dietSearch = _.debounce((term) => { this.dietSearch(term)}, 300);

		if(!this.state.selectedDiet){
			return (
				<div>
					<div className="container" id="main">

						<header className="masthead">
							<div className="container">
								<div className="row">
									<div>
										<h1 className="dietName">ESAL</h1>
									</div>
								</div>
							</div>
						</header>

						<div className="nav-wrapper">
							<div id="nav">
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
											<SearchBar
												onSearchTermChange={dietSearch} />

										</div>

									</div>
								</nav>
							</div>
						</div>
					</div>



					<div className="container" id="childrenContainer">
						{this.props.children}
					</div>
					<div id="placeholder"></div>
				</div>
			)
		}



		return (
			<div>
			<div className="container" id="main">

				<header className="masthead">
				  <div className="container">
				  <div className="row">
				    <div>
				      <h1 className="dietName">ESAL</h1>
				    </div>
				  </div>
				  </div>
				</header>	

				<div className="nav-wrapper">
				<div id="nav">
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
									<SearchBar
										onSearchTermChange={dietSearch} />

							    </div>

							  </div>
							</nav>
				</div>
				</div>
				</div>



			<div className="container" id="childrenContainer">
				<DietProfile diet={this.state.selectedDiet} />
				<DietList
					onDietSelect={selectedDiet => this.setState({selectedDiet}) }
					diets={this.state.diets} />
			</div>
			<div id="placeholder"></div>
			</div>
		)
	}
})

// export, where config/router will require it.
module.exports = App;