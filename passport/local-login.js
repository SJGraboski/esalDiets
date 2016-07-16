var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('mongoose').model('User');
var passportLocalStrategy = require('passport-local').Strategy;

// http://vladimirponomarev.com/blog/authentication-in-react-apps-jwt

module.exports = function(config) {

	return new passportLocalStategy({
		usernameField: 'email',
		passwordField: 'password',
		session: false,
		passReqToCallback: true
	}, function(req, email, password, done) {
		var userData = {
			email: email.trim(),
			password: password.trim()
		};

		// find a user by email address
		User.findOne({ email: userData.email}, function(err, user) {
			if (err) {
				return done(err);
			}

			if (!user) {
				var error = new Error('Incorrect email or password');
				error.name = "IncorrectCredentialsError";
				return done(error);
			}

		// check to see if a hashed user's password is equal
		// to a value saved in the database

		// TODO: make a user password
		user.comparePassword(userData.password, function(err, isMatch){
			if (err) {
				return done(err);
			}

			if (!isMatch) {
				var error = new Error("Incorrect email or password");
				error.name = "IncorrectCredentialsError"
				return done(error);
			}

			var payload = {
				sub: user._id,
			};
			
			// create a token string
			var token = jwt.sign(payload, config.jwtSecret);

			var userData = {
				name: user.name
			}

			return done(null, token, userData);
		})
		})
	})
}