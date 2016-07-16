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


gulp.task('install', function(cb){
  // gulp src: if package.json is in the file stream, run this
  gulp.src("./package.json")

    // pipe install function to package.json, 
    // effectively installing all packages in package.json
    .pipe(install());
  // will not run callback if error occurs
  cb();
})

gulp.task('webpack', ['install'], function(cb){
  // check if app.js exists
  gulp.src('./app/app.js')
    // ...then get the webpack config file and run it
    .pipe(webpack( require('./webpack.config.js') ))
    // We don't set up a destination file, since it's established in webpack.config.js
    .pipe(gulp.dest(''));
  // if error, don't update the callback
  cb();
})

gulp.task('nodemon', ['install', 'webpack'], function(cb){
  // run nodemon
  nodemon({
    // run server.js with nodemon
    script: 'server.js',
    // update the server whenever the dev updates a js or html file 
    // in the project directory
    ext: 'js html',
    // run in dev mode
    env: { 'NODE_ENV': 'development' }
  })
  // run the callback
  cb();
})


  
// create the default gulp task 
// (which can be run by typing "gulp" as the lone cli argument)
gulp.task('default', ['install', 'webpack', 'nodemon']);