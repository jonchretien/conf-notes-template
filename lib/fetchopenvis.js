'use strict;'

/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for OpenVis Conf.
 *
 * @param {String} abbr - Conference abbreviation.
 * @param {String} url - URL to request.
 * @param {String} conference - Conference name.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchOpenVis = function(abbr, url, conference) {
  FetchSpeakers.call(this, abbr, url, conference);
};

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchOpenVis.prototype = new FetchSpeakers();

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchOpenVis.prototype.parseSchedule = function(html) {
  var $ = cheerio.load(html);

  $('.speaker').each(function(i, el) {
    var $el = $(el);

    // skip cells without speaker info
    if ($el.find('.speaker-talk').length === 0) { return; }

    // create data structure
    this.results.speakers.push({
      speaker: $el.find('.speaker-name').text().trim(),
      talk: $el.find('.speaker-talk').text().trim(),
      url: $el.find('.speaker_bio a:first-child').attr('href')
    });
  }.bind(this));

  this.logger.log('success', 'Finished scraping ' + this.url);
};

/**
 * Expose `FetchOpenVis`.
 */
module.exports = FetchOpenVis;
