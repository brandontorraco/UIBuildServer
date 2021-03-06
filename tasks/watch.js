'use strict';

var gulp = require('gulp');
var path = require('path');
var config = require('./config');

// Monitor for file changes in source. If any related files have been updated,
// then rebuild. JavaScript is not included as Webpack handles watching files.
gulp.task('watch', ['watch:setup', 'build'], function() {
  gulp.watch(path.join(config.source, 'assets/**/*'), ['build:assets']);
  gulp.watch(path.join(config.source, 'images/**/*'), ['build:images']);
  gulp.watch(path.join(config.source, 'styles/**/*'), ['build:styles']);
  gulp.watch(path.join(config.source, 'prototype/**/*'), ['build:prototype']);
});

// Turn on watch for any tasks that follow.
gulp.task('watch:setup', function() {
  config.watch = true;
});
