/**
 * Module dependencies
 */
var fs = require('fs');
var mustache = require('mustache');
var request = require('request');
var Logger = require('./logger');

/**
 * Create instance of Logger class.
 */
var logger = new Logger();

/**
 * Handles HTTP request with provided URL and renders markdown file with results.
 * @constructor
 */
var FetchSpeakers = module.exports = function() {
  this.output = 'notes.md';
  this.template = 'templates/tmpl.mustache';
  this.results = [];
  this.markdown = null;
  this.page = null;
};

/*
 * Makes http request to specified URL.
 */
FetchSpeakers.prototype.getData = function() {
  request(this.url, function (error, response, html) {
    if (!error && response.statusCode === 200) {
      logger.log('info', 'Successfully requested ' + this.url);
      this.parseSchedule(html);
      this.renderOutput();
    }

    if (error) {
      logger.log('error', 'There was a problem requesting the url ' + error);
    }
  }.bind(this));
};

/**
 * Passes the results data through the mustache
 * template and then generates a markdown file.
 */
FetchSpeakers.prototype.renderOutput = function() {
  // load mustache template
  this.page = fs.readFileSync(this.template, 'utf8');

  // populate template with data
  this.markdown = mustache.to_html(this.page, { talks: this.results });

  // write to new file
  fs.writeFileSync(this.output, this.markdown);
  logger.log('info', 'Successfully created ' + this.output);
};
