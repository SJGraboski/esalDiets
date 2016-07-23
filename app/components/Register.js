var React = require('react');
var PropTypes = React.PropTypes;
var auth = require('../utils/authentication');


export default class Register extends React.Component {

	constructor(props, context) {
		super(props);
		context.router;
		this.state = {
			passError: false,
			emailError: false,
			regError: false,
		};
	}

	// Call this whenever the user clicks Login
	register(e) {
		this.setState({
			passError: false,
			emailError: false,
			regError: false,
		})
		// prevent default behavior
		e.preventDefault();

		// set email var and pass var to value of inputs
		var newUser = {
			email: this.refs.email.value.trim(),
			pass: this.refs.pass.value.trim(),
			conPass: this.refs.conPass.value.trim(),
			username: this.refs.username.value.trim(),
			f_name: this.refs.f_name.value.trim(),
			l_name: this.refs.l_name.value.trim(),
			gender: this.refs.gender.value.trim()
		}

		// If password doesn't match the confirmation password, tell the user.
		if (newUser.pass != newUser.conPass) {
			this.setState({
				passError: true
			})
			// stop the function
			return;
		}

		// Test if email is in the proper format
		if ( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newUser.email))) {
			this.setState({
				emailError: true
			})
			// stop the function
			return;
		}

		// if none of the above errors happened, run our Registration
		else {
			// authenticate login
			auth.register(newUser, (registered) => {
				// if we register the user
				if (registered) {
					// send us to their profile page
					this.context.router.push({pathname: '/profile'})
				}
				// otherwise
				else {
					// tell the user we had a register error
					this.setState({
						regError:true
					})
				}
			})
		}
	}

	render() {
		return (
			<div className="">
			<div className="formContainer">
			<div className="row text-center">
				<div className="formBox">
				<div>	
				<h1 className="formTitle">Register</h1>
				</div>
				<form role='form'>
					<div className='form-group'>
						<input className="regInput formEnter" type='text' ref='email' placeholder='Email' />
						{this.state.emailError && (
							<p className='error'>That doesn't look like a valid email...</p>
						)}
						<input className="regInput formEnter" type='password' ref='pass' placeholder='Password' />
						<input className="regInput formEnter" type='password' ref='conPass' placeholder='Confirm Password' />
						{this.state.passError && (
							<p className='error'>Your passwords don't match! :C</p>
						)}
						<input className="regInput formEnter" type='text' ref='username' placeholder='Username' />
						<input className="regInput formEnter" type='text' ref='f_name' placeholder='First Name' />
						<input className="regInput formEnter" type='text' ref='l_name' placeholder='Last Name' />
						<input className="regInput formEnter" type='text' ref='gender' placeholder='Gender' />
					</div>
					<button type='submit' className="formSubmit" onClick={this.register.bind(this)}>Submit</button>
				</form>
			{this.state.regError && (
				<p className='error'>Well, crud, we couldn't register you...a user might already have that email or name.</p>
			)}
			</div>
			</div>
			</div>
			</div>

		)
	}
}

Register.contextTypes = {
  router: React.PropTypes.object.isRequired
}