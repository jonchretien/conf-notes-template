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
let FetchManhattanJS = module.exports = Object.assign(Object.create(FetchSpeakers), {
  parseSchedule($) {
    $('.speaker').each((i, el) => {
      let $el = $(el);

      // create data structure
      this.conf.talks.push({
        speaker: $el.find('.speaker-name').text().trim(),
        talk: $el.find('p').text().trim(),
        url: $el.find('a:first-child').attr('href'),
      });
    });
  },
});
