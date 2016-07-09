// index.js
// bring in all of our components
var App = require('./App.js');
var Profile = require('./Profile.js');
var Calendar = require('./Calendar/Calendar.js');

// and export all of them
module.exports = {
	App: App,
	Profile: Profile,
	Calendar: Calendar
};
