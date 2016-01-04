#!/usr/bin/env node

'use strict';

/**
 * Module dependencies
 */
const config = require('./lib/config');
const logger = require('./lib/logger');

/**
 * Parses arguments passed into index.js.
 */
const Setup = {
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
    config[this.abbr].fetch.init({
      abbr: this.abbr,
      url: config[this.abbr].url,
      name: config[this.abbr].conference,
    });
  },

  /**
   * Checks for bad or missing arguments.
   */
  checkArguments() {
    if (!(this.abbr in config)) {
      logger.log('error', 'That is not a valid conference name.');
      return;
    }
  },
};

Setup.init();
