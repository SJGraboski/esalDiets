// App
// ===
var React = require('react');

var App = React.createClass({

// main component app. Takes in the other routes
	render: function() {
		return (
			<div>
			<div className="container" id="main">

				<header className="masthead">
				  <div className="container">
				  <div className="row">
				    <div>
				      <h1 className="dietName">2 Bannana Diet</h1>
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
									<a href="#" className="navbar-left"><img className="navbar-left" src="./assets/images/esallogosmall.gif" id="navlogo" /></a>
							      
							    </div>


							    <div className="navbar-collapse collapse">
							    <ul className="nav navbar-nav navbar-right icon">
				      <li><a href="#analytics"><i className="fa fa-line-chart" aria-hidden="true"></i> Analytics</a></li>
				      <li><a href="#userdata"><i className="fa fa-user" aria-hidden="true"></i> User Data</a></li>
				    </ul>

							      <form className="navbar-form navbar-left" role="search">

							   	<div className="input-group">
							      <input type="text" className="form-control dietSearch" id="dietSearch" placeholder="Diet Search"/>
							      <span className="input-group-btn">
							        <button className="btn btn-default dietSearchBTN" id="dietSearchBTN" type="button"><i className="fa fa-search" aria-hidden="true"></i></button>
							      </span>
							    </div>

							      </form>
							      
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