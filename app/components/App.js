// App
// ===
var React = require('react');
var Navigation = require('react-router').Navigation;


// bring in the search bar
var SearchBar = require('./SearchBar.js');

var App = React.createClass({

	// Allow for transitions between elements.
	mixins: [Navigation],


	// main component app. Takes in the other routes
	render: function() {
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
							      <a className="navbar-brand" href="#">EASL</a>
							    </div>


							    <div className="navbar-collapse collapse">
							    <ul className="nav navbar-nav navbar-right icon">
				      <li><a href="#placeholderspace"><i className="fa fa-line-chart" aria-hidden="true"></i> Analytics</a></li>
				      <li><a href="#userdata"><i className="fa fa-user" aria-hidden="true"></i> User Data</a></li>
				    </ul>
				    	<SearchBar />
							      
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
})

// export, where config/router will require it.
module.exports = App;