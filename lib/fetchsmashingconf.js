'use strict;'

/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for Smashing Conference.
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.speakers - List of speakers.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchSmashingConf = function(conf) {
  FetchSpeakers.call(this, conf);
};

/**
 * Make a new `FetchSmashingConf.prototype` linked to `FetchSpeakers.prototype`.
 */
FetchSmashingConf.prototype = Object.create(FetchSpeakers.prototype);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchSmashingConf.prototype.parseSchedule = function(html) {
  var $ = cheerio.load(html);

  $('.iiml').find('li').each(function(i, el) {
    var $el = $(el);
    var str = $el.find('.mt dt dd:first-child').text().trim();
    var talk = str.replace(/http.*/, '');
    var url = str.replace(/@.*/, '').match(/(http)(.*)/)[0];

    // create data structure
    this.conf.speakers.push({
      speaker: $el.find('.nf h3').text().trim(),
      talk: talk,
      url: url
    });
  }.bind(this));

  this.logger.log('success', 'Finished scraping ' + this.conf.url);
};

/**
 * Expose `FetchSmashingConf`.
 */
module.exports = FetchSmashingConf;
