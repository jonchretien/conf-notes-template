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
    $('.iiml').find('li').each((i, el) => {
      const $el = $(el);
      const str = $el.find('.mt dt dd:first-child').text().trim();
      const talk = str.replace(/http.*/, '');
      const url = str.replace(/@.*/, '').match(/(http)(.*)/)[0];
      const speaker = $el.find('.nf h3').text().trim();

      // create data structure
      this.conf.talks.push({
        speaker,
        talk,
        url,
      });
    });
  },
});
