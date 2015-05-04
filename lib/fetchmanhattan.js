'use strict;'

/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for ManhattanJS.
 *
 * @param {String} abbr - Conference abbreviation.
 * @param {String} url - URL to request.
 * @param {String} conference - Conference name.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchManhattanJS = function(abbr, url, conference) {
  FetchSpeakers.call(this, abbr, url, conference);
};

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchManhattanJS.prototype = new FetchSpeakers();

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchManhattanJS.prototype.parseSchedule = function(html) {
  var $ = cheerio.load(html);

  $('.speaker').each(function(i, el) {
    var $el = $(el);

    // create data structure
    this.results.speakers.push({
      speaker: $el.find('.speaker-name').text(),
      talk: $el.find('p').text(),
      url: $el.find('a:first-child').attr('href')
    });
  }.bind(this));

  this.logger.log('success', 'Finished scraping ' + this.url);
};

/**
 * Expose `FetchManhattanJS`.
 */
module.exports = FetchManhattanJS;
