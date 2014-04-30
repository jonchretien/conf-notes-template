/**
 * Module dependencies
 */
var fs = require('fs'),
    mustache = require('mustache'),
    request = require('request');

/**
 * Creates constructor function.
 *
 * @constructor
 */
var FetchSpeakers = module.exports = function() {
  this.results = [];
  this.template = 'templates/tmpl.mustache';
  this.markdown = null;
  this.page = null;
};

/**
 * Log messages.
 */
FetchSpeakers.prototype.logs = {
  error: 'There was a problem requesting the url',
  file: 'Created markdown file.',
  request: 'Successfully requested website.',
  scrape: 'Finished scraping website.'
};

/*
 * Makes http request to specified URL.
 */
FetchSpeakers.prototype.getData = function() {
  var _this = this;

  request(this.url, function (error, response, html) {
    if (!error && response.statusCode === 200) {
      console.log(_this.logs.request);
      _this.parseSchedule(html);
      _this.renderOutput();
    }

    if (error) {
      console.log(_this.logs.error);
    }
  });
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
  fs.writeFileSync('notes.md', this.markdown);
  console.log(this.logs.file);
};
