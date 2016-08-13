/* Esal - Diet App
 * Jerome, Greg, Racquel, Steve
 * -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ */

// dependencies
// ============
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var cors = require('cors');



// Express
// =======

// instantiate our express
var app = express();
app.use(logger('dev'));
app.use(cors());

// set up bodyparser
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));

// set up the public directory as our static folder
var staticContentFolder = './public';
app.use(express.static(staticContentFolder));

// set json webtokensecret
var jwt_secret = process.env.JWT_SECRET || "CodingsCool"
app.set('jwtSecret', jwt_secret);


// Sequelize
// =========

// bring in our sequelize models 
var models = require('./models');

// and sync them with our db
models.sequelize.sync();

// API routing
// ===========

// Note: react and react-router will handle html routing
require('./routes/api.js')(app);
// auth route to be added once we get to login


// Listen
// ======

// define our port (either our environment's preset, or 3000)
var PORT = process.env.PORT || 8080


// listen on our port
app.listen(PORT, function(){
	console.log('Esal is listening. Port: ' + PORT);
})
