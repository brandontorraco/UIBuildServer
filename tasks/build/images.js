'use strict';

var changed = require('gulp-changed');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var path = require('path');
var plumber = require('gulp-plumber');
var util = require('gulp-util');
var config = require('../config');

gulp.task('build:images', function() {
  return gulp
  .src(path.join(config.source, 'images/**/*.{gif,jpg,jpeg,png,svg}'))
  .pipe((config.watch ? plumber : util.noop)())
  .pipe(changed(path.join(config.destination, 'images')))
  .pipe((config.minify ? imagemin : util.noop)())
  .pipe(gulp.dest(path.join(config.destination, 'images')));
});
