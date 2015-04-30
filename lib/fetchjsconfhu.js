'use strict;'

/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for JSConf Budapest.
 *
 * @param {String} abbr - Conference abbreviation.
 * @param {String} url - URL to request.
 * @param {String} conference - Conference name.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchJSConfHU = function(abbr, url, conference) {
  // reuse fetchspeakers' initialization
  FetchSpeakers.call(this, abbr, url, conference);
};

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchJSConfHU.prototype = new FetchSpeakers();

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
    this.results.speakers.push({
      speaker: $el.find('.meta h4').text().trim(),
      talk: $el.find('.meta h3').text().trim(),
      url: $el.find('.twitter').attr('href')
    });
  }.bind(this));
};

/**
 * Expose `FetchJSConfHU`.
 */
module.exports = FetchJSConfHU;
