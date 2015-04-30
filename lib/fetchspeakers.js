'use strict;'

/**
 * Module dependencies
 */
var fs = require('fs');
var mustache = require('mustache');
var Q = require('q');
var request = require('request');
var Logger = require('./logger');

/**
 * Handles HTTP request with provided URL and renders markdown file with results.
 *
 * @param {String} abbr - Conference abbreviation.
 * @param {String} url - URL to request.
 * @param {String} conference - Conference name.
 * @constructor
 */
var FetchSpeakers = function(abbr, url, conference) {
  this.abbr = abbr;
  this.url = url;
  this.results = {};
  this.results.conference = conference;
  this.results.speakers = [];
  this.logger = new Logger();
};

/*
 * Makes http request to specified URL.
 */
FetchSpeakers.prototype.getData = function() {
  request(this.url, function (error, response, html) {
    if (error) {
      this.logger.log('error', 'There was a problem requesting the url ' + error);
    }

    if (!error && response.statusCode === 200) {
      this.parseSchedule(html);
      this.logger.log('info', 'Finished scraping ' + this.url);
      this.renderOutput();
    }
  }.bind(this));
};

/**
 * Passes the results data through the mustache
 * template and then generates a markdown file.
 */
FetchSpeakers.prototype.renderOutput = function() {
  var dir = './notes';
  var output = dir + '/notes-' + this.abbr + '.md';
  var view = {
    conference: this.results.conference,
    talks: this.results.speakers
  };
  var _this = this;
  var markdown;

  Q.nfcall(fs.readFile, 'templates/tmpl.mustache', 'utf8')
    .then(function(data) {
      markdown = mustache.to_html(data, view);
      _this.logger.log('info', 'Ran data through markdown template');
    })
    .then(function() {
      Q.nfcall(fs.mkdir, dir);
    })
    .then(function() {
      Q.nfcall(fs.writeFile, output, markdown);
      _this.logger.log('info', 'Successfully created ' + output);
    })
    .catch(function(error) {
      _this.logger.log('error', error);
    })
    .done();
};

/**
 * Expose `FetchSpeakers`.
 */
module.exports = FetchSpeakers;
