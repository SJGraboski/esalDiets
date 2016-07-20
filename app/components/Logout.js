var React = require('react');
var PropTypes = React.PropTypes;
var auth = require('../utils/authentication');


export default class Logout extends React.Component {

	constructor(props, context) {
		super(props);
		context.router;
	}

	// Call this whenever the user clicks Logout
	logOut(e) {
		// prevent default behavior
		e.preventDefault();

		// authenticate login
		auth.logout( (loggedOut) => {
			// if we register the user
			if (loggedOut) {
				// send us to their profile page
				this.context.router.push({pathname: '/'})
			}
		})
	}

	render() {
		return (
			<div>
				<form role='form'>
					<div className='form-group'>
					<button type='submit' onClick={this.logOut.bind(this)}>Log Out</button>
					</div>
				</form>
			</div>
		)
	}
}

Logout.contextTypes = {
  router: React.PropTypes.func.isRequired
}