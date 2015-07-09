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
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.speakers - List of speakers.
 * @constructor
 */
var FetchSpeakers = function(conf) {
  this.conf = conf;
  this.logger = new Logger();
};

/*
 * Makes http request to specified URL.
 */
FetchSpeakers.prototype.getData = function() {
  var _this = this;

  request(this.conf.url)
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
  var output = dir + '/notes-' + this.conf.abbr + '.md';
  var view = {
    conference: this.conf.conference,
    talks: this.conf.speakers
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
