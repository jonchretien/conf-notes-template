'use strict;'

/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for BrooklynJS.
 *
 * @param {String} abbr - Conference abbreviation.
 * @param {String} url - URL to request.
 * @param {String} conference - Conference name.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchBrooklynJS = function(abbr, url, conference) {
  FetchSpeakers.call(this, abbr, url, conference);
};

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchBrooklynJS.prototype = new FetchSpeakers();

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchBrooklynJS.prototype.parseSchedule = function(html) {
  var $ = cheerio.load(html);

  $('.speaker').each(function(i, el) {
    var $el = $(el);

    // create data structure
    this.results.speakers.push({
      speaker: $el.find('div').text(),
      talk: $el.find('small').text(),
      url: $el.find('div > a').attr('href')
    });
  }.bind(this));

  this.logger.log('success', 'Finished scraping ' + this.url);
};

/**
 * Expose `FetchBrooklynJS`.
 */
module.exports = FetchBrooklynJS;
