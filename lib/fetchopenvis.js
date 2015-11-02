'use strict';

/**
 * Module dependencies
 */
let cheerio = require('cheerio');
let FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for OpenVis Conf (`vis`).
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.talks - List of talks.
 * @constructor
 * @extends {FetchSpeakers}
 */
let FetchOpenVis = module.exports = function(conf) {
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
  let $ = cheerio.load(html);

  $('.speaker').each((i, el) => {
    let $el = $(el);

    // skip cells without speaker info
    if ($el.find('.speaker-talk').length === 0) { return; }

    // create data structure
    this.conf.talks.push({
      speaker: $el.find('.speaker-name').text().trim(),
      talk: $el.find('.speaker-talk').text().trim(),
      url: $el.find('.speaker_bio a:first-child').attr('href'),
    });
  });
};
