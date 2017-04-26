'use strict';

// Package dependencies
var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');
var config = require('../config');

// Build styhesheets. Currently source maps are a little iffy.
gulp.task('build:styles', function() {
  return gulp
  .src(path.join(config.source, 'styles/*.less'))
  .pipe((config.watch ? plumber : util.noop)())
  .pipe((config.sourcemaps ? sourcemaps.init : util.noop)())
  .pipe(less({
    compress: config.minify,
    paths: [
      'node_modules',
      'bower_components',
      path.join(config.source, 'styles')
    ]
  }))
  .pipe(autoprefixer())
  .pipe((config.sourcemaps ? sourcemaps.write : util.noop)())
  .pipe(gulp.dest(path.join(config.destination, 'styles')));
});
