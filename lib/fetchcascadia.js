'use strict';

/**
 * Module dependencies
 */
let FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for CascadiaFest (`cf1`, `cf2`, `cf3`).
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.talks - List of talks.
 * @constructor
 * @extends {FetchSpeakers}
 */
let FetchCascadiaFest = module.exports = function(conf) {
  FetchSpeakers.call(this, conf);
};

/**
 * Make a new `FetchCascadiaFest.prototype` linked to `FetchSpeakers.prototype`.
 */
FetchCascadiaFest.prototype = Object.create(FetchSpeakers.prototype);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchCascadiaFest.prototype.parseSchedule = function(html) {
  let $ = this.cheerio.load(html);

  $('.speaker').each((i, el) => {
    let $el = $(el);

    // create data structure
    this.conf.talks.push({
      speaker: $el.find('h4').text().trim(),
      talk: $el.find('p').text().trim(),
    });
  });
};
