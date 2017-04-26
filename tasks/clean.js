'use strict';

var gulp = require('gulp');
var del = require('del');
var config = require('./config');

// Clean existing project folder to ensure existing files from previous builds
// are no longer there.
gulp.task('clean', function () {
  del.sync(config.destination, { force: true });
});
