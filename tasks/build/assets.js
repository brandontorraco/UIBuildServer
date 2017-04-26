'use strict';

var changed = require('gulp-changed');
var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');
var util = require('gulp-util');
var config = require('../config');

// Copy static assets files from source to destination.
gulp.task('build:assets', function() {
  return gulp
  .src(path.join(config.source, 'assets/**/*'))
  .pipe(changed(config.destination))
  .pipe((config.watch ? plumber : util.noop)())
  .pipe(gulp.dest(config.destination));
});
