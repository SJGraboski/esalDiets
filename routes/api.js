// api routes
// require dependencies
var path = require('path');
var request = require('request');
var moment = require('moment')
// dependencies
var jwt = require('jsonwebtoken');

// load our models
var models = require('../models');

// load the sequelize config from our models
var sequelize = models.sequelize;



// export api routes for the express app
module.exports = function(app) {
	// Grab Profile Data
	app.get('/api/profile-data', function(req, res){
		var answered;
		var startDay;
		var theAnswers = [[], [], []];
		// in later versions, we'll actually grab the user's id and diet
		// using req's cookies.
		//
		// for now, we'll use dummy data, except the next part.

		// we first need to grab the earliest dietReport
		models.DietProgress.findAll(
			{
				where: {
					UserId: 1,
					DietId: 1,
				},
				order: [['reportDay', 'ASC']]
			}
		)
		// now we need to parse every one for answers
		.then(function(theReports){
			console.log(theReports);
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
			console.log(theAnswers);
			// We're going to check whether the user answered a question today.
			return models.DietProgress.findOne(
				{
					where: {
						UserId: 1,
						DietId: 1,
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
						userId: dietProg.UserId,
						dietId: dietProg.DietId,
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
	});

	// Grab all data associated with a particluar diet
	app.get('/api/diet-info/:dietId', function(req, res){

		// dietId
		var dietId = req.params.dietId;

		// global array variable for our answers
		var theAnswers = [ [], [], [] ];

		
		// we first pass a query to set up some variables
		var setUp = 'SET @container := 0, @orig_a3 := 0; '

		// the average answers from every day
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
										    'from DietProgresses ' + 

										  // grab the info for whatever diet we send it.
										  // Group it by the report number, 
										  // so that we get average results for every day of the diet
									    ') tempTable WHERE DietID=? GROUP BY reportNum;'


		// START QUERY
		// ===========

		// grab a particular diet
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
			// then pass the results
			.then(function(results){
				console.log(results);
				for (var i = 1; i <= results.length; i++) {
					if (results[i-1].a1) {
						theAnswers[0].push({x:i, y:results[i-1].a1})
					}
					if (results[i-1].a2) {
						theAnswers[1].push({x:i, y:results[i-1].a2})
					}
					if (results[i-1].a3dif) {
						theAnswers[2].push({x:i, y:results[i-1].a3dif})
					}
				}
				theAnswers[2].unshift({x:1, y:0});
				diet.dataValues.answers = theAnswers;
				console.log(theAnswers);
				console.log(diet);
				return res.json(diet);
			})
		})
		})
		// error check the Diet query
		.catch(function(error){
			return res.status(400).send(("No such diet!"));
		})
	})




	// search for diets
	app.get('/api/search-diet/:query', function(req, res){

		// Grab the search query.
		var query = req.params.query;

		models.Diet.findAll({
		  where: {
		    $or: [
		     {name:  {like: '%' + query + '%' }},
		     {description: { like: '%' + query + '%' }}
		    ]
		  }
		})
		.then(function(results){
			return res.json(results);
		});
	})

	// Update a person's diet.
	app.post('/api/update-report', function(req, res){
		// update report id
		var data = req.body;
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
		}
		)		
		// with that instance selected, pass it into a .then, and update it
		.then(function(report){
			res.send({report});
		})
		// catch any errors
		.catch(function(err) {
      console.log(err);
  	})
	})






	// API LOGIN AND REGISTER FUNCTIONS

    // login post
    app.post('/api/session', function(req, res){
        
        // grab username and password from form
        var email = req.body.email;
        var password = req.body.password;

        // find user by searching for username and password
        models.User.findAll({
            where: {
                email: email,
                password: password
            }
        }).then(function(result){ // then save the result as the user obj
            var user = result[0].dataValues;
            // create JSON token
            var token = jwt.sign(user, app.get('jwtSecret'), {
                expiresIn: 86400 // Token is given but will expire in 24 hours (each 1 in int is a second)
            });

            // Then send success message with token
            res.json({
                success: true,
                message: "Access granted.",
                token: token
            });
        }).catch(function(err) { // catch any errors
            res.status(403).json("{'error':'" + err + "'");
        })
    });

    // Verify authentication
    app.get('/api/session', function(req, res) {

    	console.log(req);

    	// grab the token
    	var token = req.headers.token;

			// verify the token
        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {
                // return error if there is one
                return res.json({success: false, message: "access denied"})
            }
            else {
            	// give the user access
            	return res.json({success:true, message:'You\'re in!'});
            }
        })
    })

    // // register post for students
    // app.post('/api/register', function(req, res){

    //     // grab username and password from form
    //     var username = req.body.username;
    //     var password = req.body.password;

    //     // insert sequelize here to grab the username, password, role and latest from database
    //     Users.create({
    //             username: username,
    //             password: password,
    //             role: "student",
    //             instructorName: "Instructor"
    //     }).then(function(result){
    //         // get the user from the result
    //         var user = result.dataValues;
    //         // create JSON token
            
    //         var token = jwt.sign(user, app.get('jwtSecret'), {
    //             expiresIn: 1440 // Token is given but will expire in 24 hours (requiring a re-login)
    //         });

    //         // Then send it to the user. This token will need to be used to access the API
    //         res.json({
    //             success: true,
    //             message: "Access granted.",
    //             token: token
    //         });

    //         // send response
    //         res.send("{'message':'Success! You're in!'")
    //     }).catch(function(err) {
    //         // log errors
    //         console.log(err);
    //         // send error message
    //         res.status(403).json("{'error':'" + err + "'");
    //     })
    // })

    // logout function
    app.get("/api/logout", function(req, res){
        // this simple command grabs the access token cookie, then deletes it.
        new Cookies(req, res).set('access_token');
        // send success to ajax
        res.status(200).end();
    })
}
