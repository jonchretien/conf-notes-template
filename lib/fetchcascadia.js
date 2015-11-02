'use strict';

/**
 * Module dependencies
 */
let FetchSpeakers = require('./fetchspeakers');

/**
 * Create link to `FetchSpeakers`.
 */
let FetchCascadiaFest = module.exports = Object.create(FetchSpeakers);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchCascadiaFest.parseSchedule = function(html) {
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
