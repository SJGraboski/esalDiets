// api routes
// require dependencies
var path = require('path');
var request = require('request');
var moment = require('moment')

// load our models
var models = require('../models');



// export api routes for the express app
module.exports = function(app) {
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
			// then take the results and save them to the res.send
			.then(function(result){
				if(result.a1 || result.a2 || result.a3){
					answered = true;
				}
				else {
					answered = false;
				}
				return res.send({
					userId: result.UserId,
					dietId: result.DietId,
					reportId: result.id,
					reportDay: result.reportDay,
					startDate: currentDay,
					answers: theAnswers,
					answered: answered
				});
			})
		})
	});

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
}