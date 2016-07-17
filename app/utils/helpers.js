/*Axios is a convenient NPM package for performing HTTP requests*/
var axios = require('axios');
var path = require('path');
// Create a helpers object which we will export
var helpers = {
	// get Profile Data
	getProfileData: function(userId, dietId) {
		return axios.get("/api/profile-data")
		.then(function(response){
			console.log(response);
			return response;
		})
	},

	// get Diet Data
	getDietData: function(dietId) {
		return axios.get("/api/diet-info/" + dietId)
		.then(function(response){
			console.log(response);
			return response;
		})
	},

	// get Search Results
	getSearchResults: function(query) {
		return axios.get("/api/search-diet/" + query)
		.then(function(response) {
			console.log(response);
			return response;
		})
	},

	// report update will update a progress report
	reportUpdate: function(newAnswers) {
		return axios.post("/api/update-report", newAnswers)
		.then(function(response){
			return true;
		})
	  .catch(function (error) {
    	return false;
  	});
	}
}

// export the helpers
module.exports = helpers;