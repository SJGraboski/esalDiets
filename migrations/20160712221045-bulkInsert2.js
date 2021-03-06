// Migration #2: BulkInsert2
// =========================

// this is the second iteration of our dummy data. 

// to add this data, be sure of these two things first:
//
// A) you've globally installed the sequelize cli
//     $ npm install -g sequelize
// B) you've globally installed the mysql node package
//     $ npm install -g mysql

// To add the data with the sequelize cli, run this command
//    $ sequelize db:migrate
//
// PLEASE DO NOT USE sequelize db:migrate:undo without notifying Steve,
//   unless you're using a local db.
//
// PLEASE DO NOT EDIT THIS FILE:
//  if you want something changed, notify Steve, 
//  who will produce a second migration file.

'use strict';


// bring in async for asynchronous mapping
var async = require('async');
// bring in all of our models from the models directory
var models = require('../models');


// GLOBALS
// =========

var insertCheck = 0;
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
function addProgress(user, diet, queryInterface) {

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
        reportDay: (Date.now() - (86400000 * 10)  + (86400000 * i)),
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
    // then, fulfill each sequelize promise,
    // or, in other words, create all 28 notifications
    return Promise.all(promises)
    .then(function(){
      insertCheck++;
      if (insertCheck === 4){
        return queryInterface.sequelize.query("INSERT INTO SequelizeMeta VALUES('20160712221045-bulkInsert2.js');");
      }
    });
  })
}

// our migration:
module.exports = {
  // when running the sequelize migration command, do the following
  up: function (queryInterface, Sequelize) {

    // create billy
    return models.User.create({
      username: "Billy",
      email: "Billy@me.com",
      password: "fake",
      firstname:"Billy",
      lastname: "Billenstein",
      gender: "male",
    })
    // pass bill
    .then(function(bill){
      // create jack
      return models.User.create({
        username: "Jack",
        email: "Jack@me.com",
        password: "fake",
        firstname:"Jack",
        lastname: "Jasperson",
        gender: "male",
      })
      // pass jack
      .then(function(jack){
        // create Jill
        return models.User.create({
          username: "Jill",
          email: "Jill@me.com",
          password: "fake",
          firstname:"Jill",
          lastname: "Jillinson",
          gender: "female",
        })
        // pass jill
        .then(function(jill){
          // create Josie
          return models.User.create({
            username: "Josie",
            email: "Josie@me.com",
            password: "fake",
            firstname:"Josie",
            lastname: "Joseppi",
            gender: "female",
          })
          // pass Josie
          .then(function(josie){
            // create a diet, 
            return models.Diet.create({
              name: "Three Banana Diet",
              description: "Eat three bananas in the morning " +
                           "and don't passout from hunger. " +
                           "Repeat for 28 days.",
            })
            // pass the diet
            .then(function(diet){
              // associate diet with users
              return diet.addUsers([bill, jack, jill, josie])
              // then...
              .then(function(){
                // create 28 notifications for all of them
                function promiseNotification(id, diet){
                  return new Promise(function(resolve, reject){
                    addProgress(id, diet, queryInterface);
                  })
                }
                return Promise.all([bill, jack, jill, josie].map(function(user, index){
                  return promiseNotification(user, diet);
                }))
              })
            })
          })
        })
      })
    })
  },



  // when running db:migration:undo, do the following.
  down: function (queryInterface, Sequelize) {
    // first, find the banana diet
    return models.Diet.findOne({where: {name: "Three Banana Diet"}})
    // then
    .then(function(diet) {
      // once we have the instances, find it's users
      return diet.getUsers()
      // then
      .then(function(users){
        // map each user in the array
        return users.map(function(item, index){
          // destroy every diet prog
          return models.DietProgress.destroy({
            where:{
              UserId:item.id,
              DietId: diet.id
            }
          })
          .then(function(){
            // and destroy each user
            return item.destroy();
          })
        })
      })
      // then
      .then(function(){
        // destroy the diet
        return diet.destroy()
      })
    })

    // then go into each table and set Auto Increment to the lowest possible number,
    // basically freeing up the id numbers once taken by each destroyed entry
    .then(function(){
      return queryInterface.sequelize.query("ALTER TABLE Diets AUTO_INCREMENT=1")
    })
    .then(function(){
      return queryInterface.sequelize.query("ALTER TABLE Users AUTO_INCREMENT=1")
    })
    .then(function(){
      return queryInterface.sequelize.query("ALTER TABLE DietProgresses AUTO_INCREMENT=1")
    })
  }
};