'use strict;'

/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for EmpireJS.
 *
 * @param {String} abbr - Conference abbreviation.
 * @param {String} url - URL to request.
 * @param {String} conference - Conference name.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchEmpireJS = function(abbr, url, conference) {
  // reuse fetchspeakers' initialization
  FetchSpeakers.call(this, abbr, url, conference);
};

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchEmpireJS.prototype = new FetchSpeakers();

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchEmpireJS.prototype.parseSchedule = function(html) {
  var $ = cheerio.load(html);

  $('#section-speakers .speaker').each(function(i, el) {
    var $el = $(el);

    // create data structure
    this.results.speakers.push({
      speaker: $el.find('.speaker-name').text(),
      talk: $el.find('.speaker-title').text(),
      url: $el.find('a').attr('href')
    });
  }.bind(this));
};

/**
 * Expose `FetchEmpireJS`.
 */
module.exports = FetchEmpireJS;
