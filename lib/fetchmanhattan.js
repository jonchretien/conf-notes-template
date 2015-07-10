'use strict;'

/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for ManhattanJS.
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.talks - List of talks.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchManhattanJS = function(conf) {
  FetchSpeakers.call(this, conf);
};

/**
 * Make a new `FetchManhattanJS.prototype` linked to `FetchSpeakers.prototype`.
 */
FetchManhattanJS.prototype = Object.create(FetchSpeakers.prototype);

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
    this.conf.talks.push({
      speaker: $el.find('.speaker-name').text().trim(),
      talk: $el.find('p').text().trim(),
      url: $el.find('a:first-child').attr('href')
    });
  }.bind(this));

  this.logger.log('success', 'Finished scraping ' + this.conf.url);
};

/**
 * Expose `FetchManhattanJS`.
 */
module.exports = FetchManhattanJS;
