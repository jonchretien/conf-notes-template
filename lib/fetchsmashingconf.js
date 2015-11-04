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
    $('.iiml').find('li').each((i, el) => {
      let $el = $(el);
      let str = $el.find('.mt dt dd:first-child').text().trim();
      let talk = str.replace(/http.*/, '');
      let url = str.replace(/@.*/, '').match(/(http)(.*)/)[0];

      // create data structure
      this.conf.talks.push({
        speaker: $el.find('.nf h3').text().trim(),
        talk: talk,
        url: url,
      });
    });
  },
});
