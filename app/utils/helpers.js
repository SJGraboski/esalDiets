/*Axios is a convenient NPM package for performing HTTP requests*/
var axios = require('axios');
var path = require('path');
// Create a helpers object which we will export
var helpers = {
	// get Profile Data
	getProfileData: function(userId) {
		return axios.get("/api/profile-data/" + userId)
		.then(function(response){
			console.log(response);
			return response;
		})
		.catch(function (error) {
    	return error;
  	});
	},

	// get Diet Data
	getDietData: function(dietId) {
		return axios.get("/api/diet-info/" + dietId)
		.then(function(response){
			return response;
		})
		.catch(function (error) {
    	return error;
  	});
	},

	// get Search Results
	getSearchResults: function(query) {
		return axios.get("/api/search-diet/" + query)
		.then(function(response) {
			console.log(response);
			return response;
		})
		.catch(function (error) {
    	return error;
  	});
	},

	// report update will update a progress report
	reportUpdate: function(newAnswers, token) {
		return axios.post("/api/update-report", {answers:newAnswers, token: token})
		.then(function(response){
			return true;
		})
	  .catch(function (error) {
    	return false;
  	});
	},

	// subscribe user to diet
	subscribe: function(user, diet, token) {
		return axios.post("/api/subscribe", {userId: user, dietId: diet, token: token})
		.then(function(response){
			return response;
		})
		.catch(function (error) {
    	return error;
  	});
	}
}

// export the helpers
module.exports = helpers;