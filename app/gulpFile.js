var gulp = require('gulp')
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');


gulp.task('browserify', function () {
  var b = browserify();
  b.transform(reactify);
  b.add('./js/app.js'); // The root file
  return (
    b.bundle()
      .pipe(source('output.js')) // What the output file should be named
      .pipe(gulp.dest('./__build__'))  // And what directory it should go to
  );
});


gulp.task('default', ['browserify']);