'use strict';

var path = require('path');

// Load all tasks in the tasks directory
require('require-all')(path.resolve('tasks'));
