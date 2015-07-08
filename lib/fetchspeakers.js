'use strict;'

/**
 * Module dependencies
 */
var fs = require('fs');
var mustache = require('mustache');
var promise = require('bluebird');
var request = require('request-promise');
var Logger = require('./logger');

/**
 * Promisify `fs`.
 */
promise.promisifyAll(fs);


/**
 * Hack to allow requests from secure sites.
 * http://stackoverflow.com/questions/18461979/node-js-error-with-ssl-unable-to-verify-leaf-signature
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
  var _this = this;

  request(this.url)
    .then(function scheduleHandler(html) {
      _this.parseSchedule(html);
      _this.renderOutput();
    })
    .catch(function errorHandler(error) {
      _this.logger.log('error', error);
    });
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

  fs.readFileAsync('template/tmpl.mustache', 'utf8')
    .then(function templateHandler(data) {
      markdown = mustache.to_html(data, view);
      _this.logger.log('success', 'Ran data through markdown template.');
    })
    .then(function directoryHandler() {
      fs.mkdirAsync(dir, function folderErrorHandler(err) {
        if (err) {
          _this.logger.log('info', dir + ' folder already exists.');
        }
      });
    })
    .then(function outputHandler() {
      fs.writeFileAsync(output, markdown);
      _this.logger.log('success', 'Created ' + output);
    })
    .catch(function errorHandler(err) {
      _this.logger.log('error', err);
    })
    .done();
};

/**
 * Expose `FetchSpeakers`.
 */
module.exports = FetchSpeakers;
