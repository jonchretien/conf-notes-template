#!/usr/bin/env node

'use strict';

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
    this.abbr = process.argv.slice(2)[0];

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
    var fetcher = new Config[this.abbr].fetch({
      abbr: this.abbr,
      url: Config[this.abbr].url,
      name: Config[this.abbr].conference,
      talks: []
    });
    fetcher.getData();
  },

  /**
   * Checks for bad or missing arguments.
   */
  checkArguments: function() {
    var logger = new Logger();

    if (!(this.abbr in Config)) {
      logger.log('error', 'That is not a valid conference name.');
      return;
    }
  }
};

Setup.init();
