#!/usr/bin/env node

/**
 * Module dependencies
 */
var Config = require('./lib/config');
var Logger = require('./lib/logger');

/**
 * Parses arguments passed into index.js.
 */
var Setup = {
  /**
   * Initializes logic.
   */
  init: function() {
    this.name = process.argv.slice(2)[0];

    try {
      this.fetchConferenceInfo();
    } catch (e) {
      this.checkArguments();
    }
  },

  /**
   * Creates class instances and calls
   * method to parse conference data.
   */
  fetchConferenceInfo: function() {
    var fetcher = new Config[this.name].fetch(this.name, Config[this.name].url);
    fetcher.getData(this.name);
  },

  /**
   * Checks for bad or missing arguments.
   */
  checkArguments: function() {
    var logger = new Logger();

    if (!(this.name in Config)) {
      logger.log('error', 'That is not a valid conference name.');
      return;
    }

    if (!this.name) {
      logger.log('warn', 'You must pass an argument to run the app.');
      return;
    }
  }
};

Setup.init();
