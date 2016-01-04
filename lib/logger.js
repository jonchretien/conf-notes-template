'use strict';

/**
 * Module dependencies
 */
const chalk = require('chalk');

/**
 * Map log alerts to colors.
 *
 * @type {Object}
 */
const alerts = {
  'error': chalk.red,
  'info': chalk.cyan,
  'success': chalk.green,
  'warning': chalk.yellow,
};

/**
 * Handles console logging throughout app.
 */
module.exports = {
  /**
   * Returns log message.
   *
   * @param {String} level - message category
   * @param {String} message - error message
   */
  log(level, message) {
    let msg = message;

    if (typeof msg !== 'string') {
      msg = JSON.stringify(msg);
    }

    if (level in alerts) {
      return console.log(alerts[`${level}`](`${level}: `) + msg);
    }

    return console.log(chalk.gray(`${level}: `) + msg);
  },
};
