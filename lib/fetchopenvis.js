'use strict';

/**
 * Module dependencies
 */
let FetchSpeakers = require('./fetchspeakers');

/**
 * Create link to `FetchSpeakers`.
 */
let FetchOpenVis = module.exports = Object.create(FetchSpeakers);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchOpenVis.parseSchedule = function(html) {
  let $ = this.cheerio.load(html);

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
