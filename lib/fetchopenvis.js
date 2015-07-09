'use strict;'

/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for OpenVis Conf.
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {String} conf.speakers - Array of speakers.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchOpenVis = function(conf) {
  FetchSpeakers.call(this, conf);
};

/**
 * Make a new `FetchOpenVis.prototype` linked to `FetchSpeakers.prototype`.
 */
FetchOpenVis.prototype = Object.create(FetchSpeakers.prototype);

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
    this.conf.speakers.push({
      speaker: $el.find('.speaker-name').text().trim(),
      talk: $el.find('.speaker-talk').text().trim(),
      url: $el.find('.speaker_bio a:first-child').attr('href')
    });
  }.bind(this));

  this.logger.log('success', 'Finished scraping ' + this.conf.url);
};

/**
 * Expose `FetchOpenVis`.
 */
module.exports = FetchOpenVis;
