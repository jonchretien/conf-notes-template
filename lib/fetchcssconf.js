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
    $('.people-col').find('.speaker-entity').each((i, el) => {
      const $el = $(el);

      // create data structure
      this.conf.talks.push({
        speaker: $el.find('.speaker a').text().trim(),
        talk: $el.find('.speaker').next('h2').text().trim(),
        url: $el.find('.speaker a').attr('href'),
      });
    });
  },
});
