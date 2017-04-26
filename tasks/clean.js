'use strict';

var gulp = require('gulp');
var del = require('del');
var config = require('./config');

// Clean DIST folder from previous build
gulp.task('clean', function () {
  del.sync(config.destination, { force: true });
});
