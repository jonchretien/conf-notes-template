#!/usr/bin/env node

/**
 * Module dependencies
 */
var FetchAnEventApart = require('./lib/fetchaneventapart');
var FetchBrooklynJS = require('./lib/fetchbrooklyn');
var FetchEmpireJS = require('./lib/fetchempire');
var FetchManhattanJS = require('./lib/fetchmanhattan');
var FetchOpenVis = require('./lib/fetchopenvis');
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
   * Store conference nicknames.
   * @type {Object}
   */
  conferences: {
    'aea': FetchAnEventApart,
    'bjs': FetchBrooklynJS,
    'ejs': FetchEmpireJS,
    'mjs': FetchManhattanJS,
    'vis': FetchOpenVis
  },

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
    var fetcher = new this.conferences[name]();
    fetcher.getData();
  },

  /**
   * Checks for bad or missing arguments.
   *
   * @param {String} name - Conference name
   */
  checkArguments: function(name) {
    if (!(name in this.conferences)) {
      logger.log('error', 'That is not a valid argument');
      return;
    }

    if (!name) {
      logger.log('warn', 'You must pass an argument to run the app.');
      return;
    }
  }

};

Setup.init();
