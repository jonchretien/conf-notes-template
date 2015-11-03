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
let FetchCSSConf = module.exports = Object.assign(Object.create(FetchSpeakers), {
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
