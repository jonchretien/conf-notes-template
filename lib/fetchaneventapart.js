'use strict;'

/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for An Event Apart.
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.speakers - List of speakers.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchAnEventApart = function(conf) {
  FetchSpeakers.call(this, conf);
};

/**
 * Make a new `FetchAnEventApart.prototype` linked to `FetchSpeakers.prototype`.
 */
FetchAnEventApart.prototype = Object.create(FetchSpeakers.prototype);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchAnEventApart.prototype.parseSchedule = function(html) {
  var $ = cheerio.load(html);

  $('.single-session').each(function(i, el) {
    var $el = $(el);

    // skip cells without speaker info
    if ($el.find('.speaker-link').length === 0) { return; }

    // create data structure
    this.conf.speakers.push({
      speaker: $el.find('.speaker-link').text().trim(),
      talk: $el.find('h2').text().trim(),
      url: 'http://aneventapart.com' + $el.find('.speaker-link').attr('href')
    });
  }.bind(this));

  this.logger.log('success', 'Finished scraping ' + this.conf.url);
};

/**
 * Expose `FetchAnEventApart`.
 */
module.exports = FetchAnEventApart;
