'use strict';

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

  console.log(level + ': ' + message);
};

/**
 * Expose `Logger`.
 */
module.exports = Logger;
