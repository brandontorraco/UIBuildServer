'use strict';

var glob = require('glob');
var gulp = require('gulp');
var path = require('path');
var util = require('gulp-util');
var webpack = require('webpack');
var config = require('../config');

// Build JavaScript files. Since Webpack is used, let it handle whether
// building files once or watch for changes.
gulp.task('build:scripts', function(callback) {
  webpack(options(), function(err, stats) {
    if(err) {
      throw new util.PluginError('build:scripts', err);
    }
    util.log(stats.toString({colors: true}));

    // Ensure callback is only called once to avoid issues with Gulp.
    if(callback) {
      callback();
      callback = null;
    }
  });
});

function options() {
  var options = {
    plugins: [new webpack.optimize.CommonsChunkPlugin('common.js')],
    entry: entries(),
    resolve: {
      root: path.resolve(config.source, 'scripts'),
      modulesDirectories: ['node_modules', 'bower_components']
    },
    output: {
      path: path.join(config.destination, 'scripts'),
      filename: '[name].js'
    }
  };

  // If doing a production build, add optimization plugins.
  if(config.minify) {
    options.plugins.push(new webpack.optimize.UglifyJsPlugin({
      dropDebugger: true,
      dropConsole: true
    }));
    options.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    options.plugins.push(new webpack.optimize.DedupePlugin());
  }

  // Add source maps if specified
  if(config.sourcemaps) {
    options.debug = true;
    options.devtool = 'inline-source-map';
  }

  // Add watch options if specified
  if(config.watch) {
    options.watch = true;
    options.watchDelay = 200;
  }

  return options;
}

function entries() {
  return glob
  // Get all JS files
  .sync(path.join(config.source, 'scripts/*.js'))
  // Get the filename only without directories
  .map(function(filename) {
    return path.basename(filename);
  })
  // Convert list of filenames into an object for Webpack
  .reduce(function(entries, filename) {
    var noExtension = path.basename(filename, path.extname(filename));
    entries[noExtension] = filename;
    return entries;
  }, {});
}
