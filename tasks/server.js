'use strict';
var gulp = require('gulp');
var path = require('path');
var config = require('./config');

// Run a local server to monitor static files. BrowserSync is leveraged to auto
// refresh the page on changes.
gulp.task('server', ['watch'], function (callback) {
  // moved the definition of the browser-sync inside the function as it's dev only dependency
  var browserSync = require('browser-sync');

  browserSync.init(null, {
    files: path.join(config.destination, '**/*'),
    browser: 'chrome',
    port: config.port,
    notify: false,
    online: false,
    server: {
      baseDir: config.destination
    }
  }, callback);
});
