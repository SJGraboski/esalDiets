// Usertitle
// ===
var React = require('react');

var Usertitle = React.createClass({

// main component app. Takes in the other routes
	render: function() {
		return (
			<div>
			<div className="container col-md-12">

				<div className="dietcontainer">
				    <div>
				      <h1 className="dietName">2 Bannana Diet</h1>
				    </div>
				</div>	

			</div>
			</div>
		)
	}
})

// export, where config/router will require it.
module.exports = Usertitle;