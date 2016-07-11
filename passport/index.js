// bring in passport
var passport = require('passport');

module.exports = function(config) {

	// loading strategies
	var localSignupStrategy = require('./local-signup')(config);
	var localLoginStrategy = require('./local-login')(config);

	// set passport to use these files
	passport.use('local-signup', localSignupStrategy);
	passport.use('local-login', localLoginStrategy);
}