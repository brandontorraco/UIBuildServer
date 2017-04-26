'use strict';

var changed = require('gulp-changed');
var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');
var util = require('gulp-util');
var fileinclude = require('gulp-file-include');
var gulpFilter = require('gulp-filter');
var config = require('../config');

gulp.task('build:poc', function() {
    var filter = gulpFilter(["*", "*.html"], {restore: true});
    return gulp
    .src(path.join(config.source, 'poc/**/*'))
    .pipe(changed(path.join(config.destination, 'poc')))
    .pipe(filter)
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(filter.restore)
    .pipe((config.watch ? plumber : util.noop)())
    .pipe(gulp.dest(path.join(config.destination, 'poc')));
});
