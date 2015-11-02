'use strict';

/**
 * Module dependencies
 */
let FetchSpeakers = require('./fetchspeakers');

/**
 * Create link to `FetchSpeakers`.
 */
let FetchAnEventApart = module.exports = Object.create(FetchSpeakers);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchAnEventApart.parseSchedule = function(html) {
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
