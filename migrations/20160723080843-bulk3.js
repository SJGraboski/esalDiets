// bring in async for asynchronous mapping
var async = require('async');
// bring in all of our models from the models directory
var models = require('../models');


// GLOBALS
// =========

// this function will return a number between 1 and 5.
// works great for answers 1 and 2, which are on a 1-5 spectrum.
function getRandomAnswer() {
  // random number * 5, plus 1, rounded down. This gives us a random num between 1 and 5
  return Math.floor(Math.random() * (5)) + 1;
}

// this function gets a random weight between 180 and 183.
function getRandomWeight() {
  //  We add the number 180 to a random number between 0 and 3.
  // In other words, we get a randNum between 180 and 183.
  return Math.floor(Math.random() * (4)) + 180;
}

// function to add 28 diet progress reports to db
function addProgress(user, diet) {

  // create a transaction
  return models.sequelize.transaction(function () {
    // in the transaction, save promises in this empty array
    var promises = [];
    // for 28 iterations, 
    for (var i = 0; i < 28; i++) {
      // create one of the 28 progress reports, saving it as a promise
      var newPromise = models.DietProgress.create({
        q1: "How's your mood?",
        a1: getRandomAnswer(),
        q2: "How's your energy?",
        a2: getRandomAnswer(),
        q3: "What was your weight today?",
        a3: getRandomWeight(),
        reportDay: (Date.now() - (86400000 * 30)  + (86400000 * i)),
        reportNum: (i+1)
        // ^^^ the current day, minus 30 days, plus one day times the value of i
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
    // then, fulfill each sequelize promise,
    // or, in other words, create all 28 notifications
    return Promise.all(promises)
  })
}

// our migration:
module.exports = {
  // when running the sequelize migration command, do the following
  up: function (queryInterface, Sequelize) {
    return addProgress(18, 22);
  },



  // when running db:migration:undo, do the following.
  down: function (queryInterface, Sequelize) {

  }
};