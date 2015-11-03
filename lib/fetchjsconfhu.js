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
let FetchJSConfHU = module.exports = Object.assign(Object.create(FetchSpeakers), {
  parseSchedule($) {
    $('.topics').find('.topic').each((i, el) => {
      let $el = $(el);

      // create data structure
      this.conf.talks.push({
        speaker: $el.find('.meta h4').text().trim(),
        talk: $el.find('.meta h3').text().trim(),
        url: $el.find('.twitter').attr('href'),
      });
    });
  },
});
