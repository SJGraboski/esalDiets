var React = require('react');
var PropTypes = React.PropTypes;
var auth = require('../utils/authentication');

export default class Login extends React.Component {

	constructor(props, context) {
		super(props);
		context.router;
		this.state = {
			error: false
		};
	}

	// Call this whenever the user clicks Login
	login(e) {
		// prevent default behavior
		e.preventDefault();

		// set email var and pass var to value of inputs
		var email = this.refs.email.value;
		var pass = this.refs.pass.value;

		// authenticate login
		auth.login(email, pass, (loggedIn) => {
			if (loggedIn) {
				this.context.router.push({pathname: '/profile'})
			}
			else {
				this.setState({error:true})
			}
		})
	}

	render() {
		return (
			<div>
				<form role='form'>
					<div className='form-group'>
						<input type='text' ref='email' placeholder='Email' />
						<input type='text' ref='pass' placeholder='Password' />
					</div>
					<button type='submit' onClick={this.login.bind(this)}>Submit</button>
				</form>
			{this.state.error && (
				<p className='error'>invalid email and/or password</p>
			)}
			</div>

		)
	}
}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
}