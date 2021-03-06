// api routes
// require dependencies
var path = require('path');
var request = require('request');
var moment = require('moment')
// dependencies
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

// load our models
var models = require('../models');

// load the sequelize config from our models
var sequelize = models.sequelize;



// export api routes for the express app
module.exports = function(app) {


// PART 1: GRAB DIET DATA
// -/-/-/-/-/-/-/-/-/-/-/

	// 1. Grab Profile Data
	app.get('/api/profile-data/:user', function(req, res){

		// grab the userId
		var userId = req.params.user;

		// container vars for our profile info
		var answered;
		var startDay;
		var theAnswers = [[], [], []];

		// in later versions, we'll actually grab the user's id and diet
		// using req's cookies.
		//
		// for now, we'll use dummy data, except the next part.

		// we first grab the user's current diet
		models.User.findOne({where:{id:userId}})
		.then(function(user){
			// we then need to grab the earliest dietReport
			return models.DietProgress.findAll(
				{
					where: {
						UserId: userId,
						DietId: user.DietId ? user.DietId : null 
					},
					order: [['reportDay', 'ASC']]
				}
			)
			// now we need to parse every one for answers
			.then(function(theReports){
				currentDay = theReports[0].reportDay;
				for (var i = 1; i <= theReports.length; i++) {
					if (theReports[i-1].a1){
						theAnswers[0].push({x:i, y:theReports[i-1].a1})
					}
					if (theReports[i-1].a2){
						theAnswers[1].push({x:i, y:theReports[i-1].a2})
					}
					if (theReports[i-1].a3){
						theAnswers[2].push({x:i, y:theReports[i-1].a3})
					}
				}
				// We're going to check whether the user answered a question today.
				return models.DietProgress.findOne(
					{
						where: {
							UserId: userId,
							DietId: user.DietId,
							// the report date must be less than or equal to the current time,
							// while being greater than exactly a day from now (i.e., today)
							reportDay: {
						    $lte: new Date(), // current timestamp
		    				$gt: (new Date() - 86400000) // current timestamp, minus a day (in ms)
							}
						}
					}
				)
				.then(function(dietProg){
					dietProg.getDiet()
					.then(function(diet){
						if(dietProg.a1 || dietProg.a2 || dietProg.a3){
							answered = true;
						}
						else {
							answered = false;
						}
						return res.send({
							reportId: dietProg.id,
							reportDay: dietProg.reportDay,
							startDate: currentDay,
							answers: theAnswers,
							answered: answered,
							diet: diet
						})
					})
				})			
			})
		})
	});


	// 2. Grab all data associated with a particluar diet
	app.get('/api/diet-info/:dietId', function(req, res){

		// dietId
		var dietId = req.params.dietId;

		// global array variable for our answers
		var theAnswers = [ [], [], [] ];

		
		// we first pass a query to set up some variables
		var setUp = 'SET @container := 0, @orig_a3 := 0; '

		// the average answers from every day
		// INTENSE QUERY!
		var avgAnswers =  
			// Select the reportNum, the average answers of a1 and a2.
			'SELECT reportNum, AVG(a1) as a1, AVG(a2) as a2, ' + 

				// We set up a conditional for our weight change result.
				// If it's the first report day, there can't be a change in weight.
				// So, the answer's 0.
				'CASE WHEN reportNum = 1 THEN 0 ' +

				// Otherwise, grab the average results 
				// of the current day's weight minus the weight at the diet's start.
					'ELSE AVG(a3 - orig_a3) END AS a3dif ' +

				// In order to save the original weight, 
				// we have to use a temporary selection.
			'from ( ' +

				// To do this, we select the relevant data, 
				// and send a variable of the original weight as the orig_a3
				// that we subtract from the current day's weight.
		    'select reportNum, a1, a2, a3, DietID, UserId, @orig_a3 as orig_a3, ' +
		  	
		  	// we keep a container variable for our original weight.
		  	'@container := @orig_a3, ' +

		  	// we declare an original weight variable, equal to the 
		  	// result of a case statement
		    '@orig_a3 := CASE ' +

		    	// If it's the first day of the diet, 
		    	// then save the weight as the original weight.
					'WHEN reportNum=1 THEN a3 ' +

					// Otherwise, use the container, 
					// which will carry the original weight throughout the 28 days.
					'ELSE @container END ' +

				// grab this data from the DietProgresses table
		    'from DietProgresses' + 

		  // grab the info for whatever diet we send it.
		  // Group it by the report number, 
		  // so that we get average results for every day of the diet
	    ') tempTable WHERE DietID=? GROUP BY reportNum;';

    // push answer results into an array of array
    function answerPush(arr) {
			for (var i = 1; i <= arr.length; i++) {
				if (arr[i-1].a1) {
					theAnswers[0].push({x:i, y:arr[i-1].a1})
				}
				if (arr[i-1].a2) {
					theAnswers[1].push({x:i, y:arr[i-1].a2})
				}
				if (arr[i-1].a3dif) {
					theAnswers[2].push({x:i, y:arr[i-1].a3dif})
				}
			}
			theAnswers[2].unshift({x:1, y:0});
    };

		// Use our queries!
		// ================

		// grab a particular diet
		function test(ok){};
		models.Diet.findOne({
			where:{
				id: dietId
			}
		})
		// then, grab all of the answer averages from that diet.
		.then(function(diet) {
			return sequelize.query(setUp)
			.then(function() {
				// we pass this raw query.
				return sequelize.query(avgAnswers, {replacements: [dietId], type: sequelize.QueryTypes.SELECT})
				// run the function again if weight returns null
				.then(function(results){
					// if the weight only has 1 response (ie, it's null)
					if (results[2].a3dif === null) {
						console.log("rerunning query\nrerunning query\nrerunning query\nrerunning query\nrerunning query");
						// run the query again
						return sequelize.query(avgAnswers, {replacements: [dietId], type: sequelize.QueryTypes.SELECT})
						.then(function(newResults) {
							// and push the new answers
							answerPush(newResults);
							// put the answers in our diet instance
							diet.dataValues.answers = theAnswers;
							// send the diet instance
							return res.json(diet);
						})
					}

					// otherwise, use our current answers
					else {
						answerPush(results);
						console.log(results);
						diet.dataValues.answers = theAnswers;
						return res.json(diet);
					}
				})
			})
		})
		// error check the Diet query
		.catch(function(error){
			return res.status(400).send(("No such diet!"));
		})
	})


	// PART 3: Search Bar
	// -/-/-/-/-/-/-/-/-/

	// 1. Search for diets
	app.get('/api/search-diet/:query', function(req, res){

		// Grab the search query.
		var query = req.params.query;

		// Find all diets that match the query 
		// based on name and description against search term.
		models.Diet.findAll({
		  where: {
		    $or: [
		     {name:  {like: '%' + query + '%' }},
		     {description: { like: '%' + query + '%' }}
		    ]
		  },
		  limit: 5
		})
		// Send results to browser
		.then(function(results){
			return res.json(results);
		});
	})



	// PART 2: UPDATE USER DIETS
	// -/-/-/-/-/-/-/-/-/-/-/-/-/

	// 1. Subscribe to a diet
	// ======================
	app.post('/api/subscribe', function(req, res) {

		// First check that the user is logged in

		// grab the token
		var token = req.body.token;
		// verify the token
    jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
      if (err) {
      	console.log("badtoken");
          // return error if there is one
          return res.status(400).json("{'error':'" + err + "'")
      }
      else {
      	// grab the newAnswers
      	var answers = req.body.answers;
				// First, make a function to add 28 progress reports
				// function to add 28 diet progress reports to db
				function addProgress(user, diet) {

					// counter for our insert
					var insertCheck = 0;
				  // create a transaction
				  return sequelize.transaction(function() {
				    // in the transaction, save promises in this empty array
				    var promises = [];
				    // for 28 iterations, 
				    for (var i = 0; i < 28; i++) {
				      // create one of the 28 progress reports, saving it as a promise
				      var newPromise = models.DietProgress.create({
				        q1: "How's your mood?",
				        a1: (i == 0) ? answers[0] : null, // if it's the first report,
				        q2: "How's your energy?",
				        a2: (i == 0) ? answers[1] : null, // then we want to save answers.
				        q3: "What was your weight today?",
				        a3: (i == 0) ? answers[2] : null, // otherwise their null
				        reportDay: (Date.now() + (86400000 * i)),
				        reportNum: (i+1)
				        // ^^^ the current day, minus 28 days, plus one day times the value of i
				      })
				      // then, with the dietProg passed,
				      .then(function(dietProg){
				        // set the user to the user argument of addProgress
				        return dietProg.setUser(user)
				        // then, 
				        .then(function(){
				          // set the diet to the diet argument of addProgress
				          return dietProg.setDiet(diet)
				        })
				      })
				      // push each promise to the newPromise array
				      promises.push(newPromise);
				    }
				    // or, in other words, create all 28 notifications
				    return Promise.all(promises)
		    	})
		    	.then(function(){
		    		// return true on success
		    		return res.json({success: 'true'});
		    	})
				}

				// Now, grab the user and diet from req
				var userId = req.body.userId;
				var dietId = req.body.dietId;
				console.log("User Id:" + userId);
				console.log("Diet Id:" + dietId);

				// If the user ever subscribed to this diet before
				// we need to remove that data, so we don't have conflicts with data.
				// Plus, we don't want to average in old data to total avgs
				// considering a less scrupulous user might create, track and leave diets
				// to screw around with the numbers

				models.DietProgress.destroy({
					where:{
						DietId: dietId,
						UserId: userId
					}
				})
				// whether it deletes anything or not, move one
				.then(function(){
				
					// Find the diet
					return models.Diet.findOne({
						where: {
							id: dietId
						}
					})
					// and make the user's diet the one we grabbed from req
					.then(function(diet){
						return diet.addUser(userId)
						// and now update their diets
						.then(function(){
							// create 28 notifications for the user with this promise chain
							return addProgress(userId, dietId)              
            })
					})
				})
			}
		})
	})

	// 2. First Report Answer
	// ======================
	app.post('api/first-report', function(req, res){

		// First check that the user is logged in
		var token = req.body.token;

		// verify the token
    jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
      if (err) {
      	console.log("badtoken");
          // return error if there is one
          return res.status(400).json("{'error':'" + err + "'")
      }
      else {
				// grab userId
				var userId = req.body.userId;

				// Find the user's first prog report with diet id
				models.User.findOne({where:{id:userId}})
				.then(function(user){
					return models.DietProgress.findOne({
						where:{
							UserId: user.id,
							DietId: user.DietId
						},
						order: [['reportDay', 'ASC']]
					})
					// then add the answers
					.then(function(dp){
						// update report
						var data = req.body.answers;
						var report;
						models.DietProgress.update({
							a1: data.a1,
							a2: data.a2,
							a3: data.a3
						},
						{
							where: {
								id: data.reportId
							}
						})		
						// with that instance selected, pass it into a .then, and update it
						.then(function(report){
							res.send({report});
						})
						// catch any errors
						.catch(function(err) {
				      console.log(err);
				  	})
					})
				})
			}
		})
	})


	// 3. Update a person's diet from profile.
	// =======================================
	app.post('/api/update-report', function(req, res){

		// First check that the user is logged in
		var token = req.body.token;

		// verify the token
    jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
      if (err) {
      	console.log("badtoken");
          // return error if there is one
          return res.status(400).json("{'error':'" + err + "'")
      }
      else {
				// update report
				var data = req.body.answers;
				var report;
				models.DietProgress.update({
					a1: data.a1,
					a2: data.a2,
					a3: data.a3
				},
				{
					where: {
						id: data.reportId
					}
				})		
				// with that instance selected, pass it into a .then, and update it
				.then(function(report){
					res.send({report});
				})
				// catch any errors
				.catch(function(err) {
		      console.log(err);
		  	})
			}
  	});
  })







	// API LOGIN AND REGISTER FUNCTIONS

  // login a user
  app.post('/api/session', function(req, res){
      
    // grab username from form
    var email = req.body.email;
    var password = req.body.password;

    // find user by searching for username and password
    models.User.findOne({
        where: {
            email: email
        }
    }).then(function(db_result){ // then save the result as the user obj

  		// We first need to compare the user's entry pass
  		// with the hash stored in the db
      var hash = db_result.dataValues.password;

      // We use bcrypts compare function to test 
      // whether we found a good password.
      bcrypt.compare(password, hash, function(err, goodPass) {
				// If the password doesn't hash into our stored hash
				if (!goodPass) {
					// give the user an error prompt.
          res.status(403).json("{'error':'" + err + "'")
				}
				// otherwise, continue with the rest of our function
				else {

					// grab the userID and Username from our sequelize results
          userData = {
          	userId: db_result.dataValues.id,
          	username: db_result.dataValues.username,
          }
          
          // create JSON token with the our user info
          var token = jwt.sign(userData, app.get('jwtSecret'), {
              expiresIn: 86400 // Token is given but will expire in 24 hours (each 1 in int is a second)
          })

          // Then send success message with our token
          return res.json({
            success: true,
            message: 'Access granted.',
            token: token
          })
      	}
			})
		})
  	.catch(function(err) { // catch any errors
    	res.status(403).json("{'error':'" + err + "'");
  	})
  });

  // Verify authentication
  app.get('/api/session', function(req, res) {

  	// grab the token
  	var token = req.headers.authorization;

		// verify the token
    jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
      if (err) {
      	console.log("badtoken");
          // return error if there is one
          return res.status(400).json("{'error':'" + err + "'")
      }
      else {
      	console.log("good");
      	console.log(decoded);
      	// give the user access
      	return res.json({
      		success: true, 
      		message: 'You\'re in!',
      		userId: decoded.userId,
      		username: decoded.username,
      		dietId: decoded.dietId,
      		token: token
      	});
      }
    })
  })


  // Register a user
  app.post('/api/register', function(req, res){

    // grab user info from the req
    var user = req.body;

    // generate a 10 round salt
    var salt = 	bcrypt.genSaltSync(10);

    // create a bcrypted hash of the password,
    // using our salt.
		var hash = bcrypt.hashSync(user.pass, salt);

    // create a User with Sequelize
    models.User.create({
	    username: user.username,
	    email: user.email,
	    password: hash,
	    firstname: user.f_name,
	    lastname: user.l_name,
	    gender: user.gender
    }).then(function(db_result){
      // get the apropos user data from the result
          userData = {
          	userId: db_result.dataValues.id,
          	username: db_result.dataValues.username,
          }

      // create JSON token
      var token = jwt.sign(userData, app.get('jwtSecret'), {
          expiresIn: 86400 // Token is given but will expire in 24 hours (each 1 in int is a second)
      });

      // Then send success message with token
      return res.json({
          success: true,
          message: "Access granted.",
          token: token
      });
    }).catch(function(err) { // catch any errors
        res.status(403).json("{'error':'" + err + "'");
    })
  });


  // Logout a user
  app.delete("/api/session", function(req, res){
   	
   	// grab the token (which shouldn't exist)
  	var token = req.headers.authorization;

		// make sure that a token doesn't verify
    jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
        // If no token is verified, then we know the user is logged out
        if (err) {
        	// so if there's an error,
        	console.log("notLoggedIn");
            // then send a success message
            return res.status(200).json("{'success:true':'Logged Out!'")
        }
        // If there's no error, 
        else {
        	// then we know the user is still logged in, 
        	// and logout did not work.
        	console.log("Logged In")
        	// send a fail message
        	return res.status(400).json({success:false, message:'You\'re still logged in!'});
        }
      })
  })
}
