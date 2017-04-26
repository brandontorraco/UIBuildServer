'use strict';

var glob = require('glob');
var gulp = require('gulp');
var path = require('path');
var util = require('gulp-util');
var webpack = require('webpack');
var config = require('../config');

gulp.task('build:scripts', function(callback) {
  webpack(options(), function(err, stats) {
    if(err) {
      throw new util.PluginError('build:scripts', err);
    }
    util.log(stats.toString({colors: true}));

    // Ensure callback is only called once
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

  // Add source maps
  if(config.sourcemaps) {
    options.debug = true;
    options.devtool = 'inline-source-map';
  }

  // Add watch options
  if(config.watch) {
    options.watch = true;
    options.watchDelay = 200;
  }

  return options;
}

function entries() {
  return glob
  .sync(path.join(config.source, 'scripts/*.js'))
  // Get usable filename
  .map(function(filename) {
    return path.basename(filename);
  })
  // Transform usable filenames into an object for Webpack
  .reduce(function(entries, filename) {
    var noExtension = path.basename(filename, path.extname(filename));
    entries[noExtension] = filename;
    return entries;
  }, {});
}
