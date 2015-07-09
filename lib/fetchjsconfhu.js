'use strict;'

/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for JSConf Budapest.
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.speakers - List of speakers.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchJSConfHU = function(conf) {
  FetchSpeakers.call(this, conf);
};

/**
 * Make a new `FetchJSConfHU.prototype` linked to `FetchSpeakers.prototype`.
 */
FetchJSConfHU.prototype = Object.create(FetchSpeakers.prototype);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchJSConfHU.prototype.parseSchedule = function(html) {
  var $ = cheerio.load(html);

  $('.topics').find('.topic').each(function(i, el) {
    var $el = $(el);

    // create data structure
    this.conf.speakers.push({
      speaker: $el.find('.meta h4').text().trim(),
      talk: $el.find('.meta h3').text().trim(),
      url: $el.find('.twitter').attr('href')
    });
  }.bind(this));

  this.logger.log('success', 'Finished scraping ' + this.conf.url);
};

/**
 * Expose `FetchJSConfHU`.
 */
module.exports = FetchJSConfHU;
