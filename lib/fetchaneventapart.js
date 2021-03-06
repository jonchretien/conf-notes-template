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
    $('.single-session').each((i, el) => {
      const $el = $(el);

      // skip cells without speaker info
      if (!$el.find('.speaker-link').length) {
        return;
      }

      // create data structure
      this.conf.talks.push({
        speaker: $el.find('.speaker-link').text().trim(),
        talk: $el.find('h2').text().trim(),
        url: `http://aneventapart.com${$el.find('.speaker-link').attr('href')}`,
      });
    });
  },
});
