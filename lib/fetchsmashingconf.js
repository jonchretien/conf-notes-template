'use strict;'

/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for Smashing Conference.
 *
 * @param {String} abbr - Conference abbreviation.
 * @param {String} url - URL to request.
 * @param {String} conference - Conference name.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchSmashingConf = function(abbr, url, conference) {
  FetchSpeakers.call(this, abbr, url, conference);
};

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchSmashingConf.prototype = new FetchSpeakers();

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
    this.results.speakers.push({
      speaker: $el.find('.nf h3').text().trim(),
      talk: talk,
      url: url
    });
  }.bind(this));

  this.logger.log('success', 'Finished scraping ' + this.url);
};

/**
 * Expose `FetchSmashingConf`.
 */
module.exports = FetchSmashingConf;
