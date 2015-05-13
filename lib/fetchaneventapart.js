'use strict;'

/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for An Event Apart.
 *
 * @param {String} abbr - Conference abbreviation.
 * @param {String} url - URL to request.
 * @param {String} conference - Conference name.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchAnEventApart = function(abbr, url, conference) {
  FetchSpeakers.call(this, abbr, url, conference);
};

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchAnEventApart.prototype = new FetchSpeakers();

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
    this.results.speakers.push({
      speaker: $el.find('.speaker-link').text().trim(),
      talk: $el.find('h2').text().trim(),
      url: 'http://aneventapart.com' + $el.find('.speaker-link').attr('href')
    });
  }.bind(this));

  this.logger.log('success', 'Finished scraping ' + this.url);
};

/**
 * Expose `FetchAnEventApart`.
 */
module.exports = FetchAnEventApart;
