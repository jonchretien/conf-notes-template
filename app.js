#!/usr/bin/env node

/*
 * Module dependencies
 */
var FetchSpeakers = require('./lib/fetchspeakers'),
    FetchBrooklynJS = require('./lib/fetchbrooklyn'),
    FetchEmpireJS = require('./lib/fetchempire'),
    FetchManhattanJS = require('./lib/fetchmanhattan'),
    FetchOpenVis = require('./lib/fetchopenvis');


/**
 * @overvew Parses arguments passed into app.js.
 */
var ArgumentParser = {

  /**
   * Store conference nicknames.
   * @type {Object}
   */
  conferences: {
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
   * Checks for bad or missing arguments.
   *
   * @param {String} name - Conference name
   */
  checkArguments: function(name) {
    if (!(name in this.conferences)) {
      console.log('That is not a valid argument');
      return;
    }

    if (!name) {
      console.log('You must pass an argument to run the app.');
      return;
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

    // openvis is a special case since we're not doing a http request
    if (fetcher.url.indexOf('openvisconf') !== -1) {
      fetcher.parseSchedule();
      fetcher.renderOutput();
      return;
    }

    fetcher.getData();
  }
};

ArgumentParser.init();
