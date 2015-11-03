#!/usr/bin/env node

'use strict';

/**
 * Module dependencies
 */
const CONFIG = require('./lib/config');
let logger = require('./lib/logger');

/**
 * Parses arguments passed into index.js.
 */
let Setup = {
  /**
   * Initial setup.
   */
  init() {
    this.abbr = process.argv.slice(2)[0];

    try {
      this.fetchConferenceInfo();
    } catch (e) {
      this.checkArguments();
    }
  },

  /**
   * Passes conference details to object.
   */
  fetchConferenceInfo() {
    CONFIG[this.abbr].fetch.init({
      abbr: this.abbr,
      url: CONFIG[this.abbr].url,
      name: CONFIG[this.abbr].conference,
    });
  },

  /**
   * Checks for bad or missing arguments.
   */
  checkArguments() {
    if (!(this.abbr in CONFIG)) {
      logger.log('error', 'That is not a valid conference name.');
      return;
    }
  },
};

Setup.init();
