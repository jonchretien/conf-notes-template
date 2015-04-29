'use strict;'

/**
 * Module dependencies
 */
var fs = require('fs');
var mustache = require('mustache');
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
  this.logger = new Logger();
  this.abbr = abbr;
  this.url = url;
  this.results = {};
  this.results.conference = conference;
  this.results.speakers = [];
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
  var _this = this;

  fs.readFile('templates/tmpl.mustache', 'utf8', function(error, data) {
    if (error) {
      throw error;
    }

    var markdown = mustache.to_html(data, { conference: _this.results.conference, talks: _this.results.speakers });

    fs.mkdir(dir, function(err) {
      if (err) {
        _this.logger.log('info', 'The directory ' + dir + ' already exists');
      }

      fs.writeFile(output, markdown, function() {
        _this.logger.log('info', 'Successfully created ' + output);
      });
    });
  });
};

/**
 * Expose `FetchSpeakers`.
 */
module.exports = FetchSpeakers;
