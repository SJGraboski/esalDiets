// GULPFILE:
// This will handle the installation of npm packages, 
// the operation of webpack.config.js,
// and the running of nodemon.
// Just enter "gulp" on the commandline

// dependencies
var gulp = require('gulp');
var install = require("gulp-install"); // for npm install
var webpack = require('gulp-webpack'); // for webpack operation
var nodemon = require('gulp-nodemon'); // for nodemon


// create the default gulp task 
// (which can be run by typing "gulp" as the lone cli argument)
gulp.task('default', function() {

	// gulp src: if package.json is in the file stream, run this
	gulp.src("./package.json")

		// pipe install function to package.json, 
    // effectively installing all packages in package.json
	  .pipe(install());

	// if there's an app/app.js...
	gulp.src('./app/app.js')
		// ...then get the webpack config file and run it
    .pipe(webpack( require('./webpack.config.js') ))
    // We don't set up a destination file, since it's established in webpack.config.js
    .pipe(gulp.dest(''))

  // run the nodemon gulp plugin
  nodemon({
  	// run server.js with nodemon
    script: 'server.js',
    // update the server whenever the dev updates a js or html file 
    // in the project directory
    ext: 'js html',
    // run in dev mode
  	env: { 'NODE_ENV': 'development' }
  })
});