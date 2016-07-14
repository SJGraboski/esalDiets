// // authorization functions
// module.exports = {
// 	// log a user in by checking email and password.
// 	// includes a callback function
// 	login(email, pass, callback) {
// 		// our callback function
// 		callback = arguments[arguments.length-1];
// 		// if we have a local storage token
// 		if (localStorage.token) {
// 			// and if there's a callback
// 			if (callback) {
// 				// then run callback with true
// 				callback(true)
// 			}
// 			// this onChange(true)
// 			this.onChange(true);
// 			return;
// 		}
// 		// pretendRequest
// 		pretendRequest(email, pass (res) => {
// 			if (res.authenticated) {
// 				if (callback){
// 					callback(true);
// 				}
// 				this.onChange(true)
// 			} else {
// 				if (callback) {
// 					callback(false)
// 				}
// 				this.onChange(false)
// 			}
// 		})	
// 	},

// 	// get a web token
// 	getToken: function() {
// 		return localStorage.token
// 	},

// 	// logout
// 	logout: function (callback) {
// 		delete localStorage.token;
// 		if (callback) {
// 			callback();
// 		}
// 		this.onChange(false);
// 	},

// 	// loggedIn
// 	loggedIn: function() {
// 		return !!localStorage.token;
// 	},

// 	onChange: function () {}
// }

// function pretendRequest(email, pass, callback) {
// 	setTimeout(() => {
// 		if (email ===)
// 	}

// 		)
// }