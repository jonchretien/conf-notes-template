'use strict';

/**
 * Module dependencies
 */
let FetchSpeakers = require('./fetchspeakers');

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {Object} $ - Cheerio parsed HTML
 */
module.exports = Object.assign(Object.create(FetchSpeakers), {
  parseSchedule($) {
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
  },
});
