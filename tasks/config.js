'use strict';

// Set up configurations based on environment variables set
var environment = (process.env.NODE_ENV || 'development').trim();
var port = parseInt(process.env.PORT, 10);

exports.port = port || 1111;
exports.sourcemaps = environment === 'development';
exports.minify = environment !== 'development';
exports.source = 'src';
exports.destination = 'dist';
