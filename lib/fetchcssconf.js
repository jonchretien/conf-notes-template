'use strict';

/**
 * Module dependencies
 */
let FetchSpeakers = require('./fetchspeakers');

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
      let $el = $(el);

      // create data structure
      this.conf.talks.push({
        speaker: $el.find('.speaker a').text().trim(),
        talk: $el.find('.speaker').next('h2').text().trim(),
        url: $el.find('.speaker a').attr('href'),
      });
    });
  },
});
