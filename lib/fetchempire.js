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
    $('#section-speakers .speaker').each((i, el) => {
      const $el = $(el);

      // create data structure
      this.conf.talks.push({
        speaker: $el.find('.speaker-name').text().trim(),
        talk: $el.find('.speaker-title').text().trim(),
        url: $el.find('a').attr('href'),
      });
    });
  },
});
