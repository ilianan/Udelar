var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    csso        = require('gulp-csso'),
    concat      = require('gulp-concat'),
    livereload  = require('gulp-livereload'), 
    tinylr      = require('tiny-lr'),
    express     = require('express'),
    app         = express(),
    path        = require('path'),
    server      = tinylr();

// Templates.
var TEMPLATES_PATH = 'www/**/*.html';

// SASS settings. 
var SCSS_PATH = 'www/scss/**/*.scss';
var CSS_PATH = 'www/css';

// Web server settings.
PORT = 8000;
 
gulp.task('css', function() {
  return gulp.src(SCSS_PATH)
    .pipe( 
      sass( { 
        includePaths: [SCSS_PATH],
        errLogToConsole: true
      } ) )
    .pipe( csso() )
    .pipe( gulp.dest(CSS_PATH) )
    .pipe( livereload( server ));
});

gulp.task('livereload', function () {
  return gulp.src(TEMPLATES_PATH)
    .pipe(livereload(server));
});
 
gulp.task('express', function() {
  app.use(express.static(path.resolve('./www')));
  app.listen(PORT);
  gutil.log('Listening on port: ' + PORT);
});
 
gulp.task('watch', function () {
  livereload.listen();

  gulp.watch(SCSS_PATH,['css']);
  gulp.watch(TEMPLATES_PATH, ['livereload']);
});
 
// Default Task
gulp.task('default', ['css','express','watch']);
