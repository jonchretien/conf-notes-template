/**
 * Module dependencies
 */
var fs = require('fs');
var mustache = require('mustache');
var request = require('request');
var Logger = require('./logger');

/**
 * Expose `FetchSpeakers`.
 */
module.exports = FetchSpeakers;

/**
 * Handles HTTP request with provided URL and renders markdown file with results.
 * @constructor
 */
function FetchSpeakers() {
  this.logger = new Logger();
  this.results = [];
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
  var output = dir + '/notes-' + this.name + '.md';
  var _this = this;

  fs.readFile('templates/tmpl.mustache', 'utf8', function(error, data) {
    if (error) {
      throw error;
    }

    var markdown = mustache.to_html(data, { talks: _this.results });

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
