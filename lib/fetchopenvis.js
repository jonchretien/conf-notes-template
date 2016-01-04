'use strict';

/**
 * Module dependencies
 */
const FetchSpeakers = require('./fetchspeakers');

/**
 * Expose module.
 */
module.exports = Object.assign(Object.create(FetchSpeakers), {
  /**
   * Parses through the speaker schedule.
   *
   * @param {Object} $ - Cheerio parsed HTML
   */
  parseSchedule($) {
    $('.speaker').each((i, el) => {
      const $el = $(el);

      // skip cells without speaker info
      if (!$el.find('.speaker-talk').length) {
        return;
      }

      // create data structure
      this.conf.talks.push({
        speaker: $el.find('.speaker-name').text().trim(),
        talk: $el.find('.speaker-talk').text().trim(),
        url: $el.find('.speaker_bio a:first-child').attr('href'),
      });
    });
  },
});
