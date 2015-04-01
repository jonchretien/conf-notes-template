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
  this.conference = null;
  this.results = [];
};

/*
 * Makes http request to specified URL.
 *
 * @param {String} conf - Conference name.
 */
FetchSpeakers.prototype.getData = function(conf) {
  this.conference = conf;

  request(this.url, function (error, response, html) {
    if (!error && response.statusCode === 200) {
      logger.log('info', 'Successfully requested ' + this.url);
      this.parseSchedule(html);
      this.renderOutput(conf);
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
  var dir = './notes'
  var output = dir + '/notes-' + this.conference + '.md';

  fs.readFile('templates/tmpl.mustache', 'utf8', function(error, data) {
    if (error) {
      throw error;
    }

    var markdown = mustache.to_html(data, { talks: this.results });

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFile(output, markdown, function(err) {
      logger.log('info', 'Successfully created ' + output);
    });
  }.bind(this));
};
