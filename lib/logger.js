'use strict';

/**
 * Module dependencies
 */
var chalk = require('chalk');

/**
 * Handles console logging throughout app.
 * @constructor
 */
var Logger = function() {
  this.alerts = {};
};

/**
 * Returns log message.
 *
 * @param {String} level - message category
 * @param {String} message
 */
Logger.prototype.log = function(level, message) {
  this.alerts = {
    'error': chalk.red(level + ': '),
    'info': chalk.cyan(level + ': '),
    'success': chalk.green(level + ': '),
    'warning': chalk.yellow(level + ': ')
  };

  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }

  console.log(this.alerts['' + level] + message);
};

/**
 * Expose `Logger`.
 */
module.exports = Logger;
