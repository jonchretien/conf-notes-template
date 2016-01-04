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

      // create data structure
      this.conf.talks.push({
        speaker: $el.find('.name h3').text().trim(),
        talk: $el.find('.title').text().trim(),
        url: $el.find('.twitter').attr('href'),
      });
    });
  },
});
