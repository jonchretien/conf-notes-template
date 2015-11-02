'use strict';

/**
 * Module dependencies
 */
let chalk = require('chalk');

/**
 * Map log alerts to colors.
 *
 * @type {Object}
 */
const ALERTS = {
  'error': chalk.red,
  'info': chalk.cyan,
  'success': chalk.green,
  'warning': chalk.yellow
};

/**
 * Handles console logging throughout app.
 */
let Logger = module.exports = {
  /**
   * Returns log message.
   *
   * @param {String} level - message category
   * @param {String} message - error message
   */
  log(level, message) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }

    if (level in ALERTS) {
      return console.log(ALERTS[`${level}`](`${level}: `) + message);
    }

    return console.log(chalk.gray(`${level}: `) + message);
  },
};
