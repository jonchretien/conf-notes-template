'use strict';

/**
 * Module dependencies
 */
var chalk = require('chalk');

/**
 * Handles console logging throughout app.
 * @constructor
 */
var Logger = function() {};

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

  var output = (level === 'error') ?
    chalk.red(level + ': ') + message :
    chalk.cyan(level + ': ') + message;

  console.log(output);
};

/**
 * Expose `Logger`.
 */
module.exports = Logger;
