'use strict';

/**
 * Module dependencies
 */
let FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for An Event Apart (`aea`).
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.talks - List of talks.
 * @constructor
 * @extends {FetchSpeakers}
 */
let FetchAnEventApart = module.exports = function(conf) {
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
  let $ = this.cheerio.load(html);

  $('.single-session').each((i, el) => {
    let $el = $(el);

    // skip cells without speaker info
    if ($el.find('.speaker-link').length === 0) { return; }

    // create data structure
    this.conf.talks.push({
      speaker: $el.find('.speaker-link').text().trim(),
      talk: $el.find('h2').text().trim(),
      url: `http://aneventapart.com${$el.find('.speaker-link').attr('href')}`,
    });
  });
};
