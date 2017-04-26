'use strict';

var gulp = require('gulp');

// Run a build. This involves cleaning existing files and building assets.
gulp.task('build', [
  'clean',
  'build:assets',
  'build:poc',
  'build:images',
  'build:styles',
  'build:scripts'
]);
