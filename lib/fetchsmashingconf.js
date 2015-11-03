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
