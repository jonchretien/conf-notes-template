#!/usr/bin/env node

/**
 * Module dependencies
 */
var Config = require('./lib/config');
var Logger = require('./lib/logger');

/**
 * Create instance of Logger class.
 */
var logger = new Logger();

/**
 * Parses arguments passed into app.js.
 */
var Setup = {
  /**
   * Initializes logic.
   */
  init: function() {
    var name = process.argv.slice(2)[0];

    try {
      this.fetchConferenceInfo(name);
    } catch (e) {
      this.checkArguments(name);
    }
  },

  /**
   * Creates class instances and calls
   * methods to parse conference data.
   *
   * @param {String} name - Conference name
   */
  fetchConferenceInfo: function(name) {
    var fetcher = new Config[name].fetch(name, Config[name].url);
    fetcher.getData(name);
  },

  /**
   * Checks for bad or missing arguments.
   *
   * @param {String} name - Conference name
   */
  checkArguments: function(name) {
    if (!(name in Config)) {
      logger.log('error', 'That is not a valid conference name.');
      return;
    }

    if (!name) {
      logger.log('warn', 'You must pass an argument to run the app.');
      return;
    }
  }
};

Setup.init();
