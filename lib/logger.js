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
  this.alerts = {
    'error': chalk.red,
    'info': chalk.cyan,
    'success': chalk.green,
    'warning': chalk.yellow
  };
};

/**
 * Returns log message.
 *
 * @param {String} level - message category
 * @param {String} message
 */
Logger.prototype.log = function(level, message) {
  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }

  if (this.alerts[level]) {
    return console.log(this.alerts['' + level](level + ': ') + message);
  }

  return console.log(chalk.gray(level + ': ') + message);
};

/**
 * Expose `Logger`.
 */
module.exports = Logger;
