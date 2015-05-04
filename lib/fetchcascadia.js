'use strict;'

/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for CascadiaFest.
 *
 * @param {String} abbr - Conference abbreviation.
 * @param {String} url - URL to request.
 * @param {String} conference - Conference name.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchCascadiaFest = function(abbr, url, conference) {
  FetchSpeakers.call(this, abbr, url, conference);
};

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchCascadiaFest.prototype = new FetchSpeakers();

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchCascadiaFest.prototype.parseSchedule = function(html) {
  var $ = cheerio.load(html);

  $('.speaker').each(function(i, el) {
    var $el = $(el);

    // create data structure
    this.results.speakers.push({
      speaker: $el.find('h4').text().trim(),
      talk: $el.find('p').text().trim()
    });
  }.bind(this));

  this.logger.log('success', 'Finished scraping ' + this.url);
};

/**
 * Expose `FetchCascadiaFest`.
 */
module.exports = FetchCascadiaFest;
