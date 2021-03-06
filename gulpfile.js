const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require("gulp-rename");
const uglify = require('gulp-uglifyjs');
const browserSync = require('browser-sync');

// Browser-sync task
gulp.task('server', function() {
  browserSync.init({
    server: "./example/"
  });

  // Watch tasks
  gulp.watch(['./src/*.js'], ['reload']);
  gulp.watch(['./example/*.html', './example/js/*.js', './example/css/*.css'],
    browserSync.reload);
});

// Reload task
gulp.task('reload', function() {
  gulp.src(['./src/mango.js'])
    .pipe(babel({
      presets: ['env'],
      plugins: ['add-module-exports', 'transform-object-rest-spread',
        'transform-es2015-modules-umd'
      ]
    }))
    .pipe(uglify())
    .pipe(rename('mango.min.js'))
    .pipe(gulp.dest('./example/js'))
});

// Build task
gulp.task('build', function() {
  gulp.src(['./src/mango.js'])
    .pipe(babel({
      presets: ['env'],
      plugins: ['add-module-exports', 'transform-object-rest-spread',
        'transform-es2015-modules-umd'
      ]
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('mango.min.js'))
    .pipe(gulp.dest('./dist'))
});

// Set the defaukt task as server
gulp.task('default', ['server']);
