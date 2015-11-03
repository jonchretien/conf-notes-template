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
let FetchAnEventApart = module.exports = Object.assign(Object.create(FetchSpeakers), {
  parseSchedule($) {
    $('.single-session').each((i, el) => {
      let $el = $(el);

      // skip cells without speaker info
      if ($el.find('.speaker-link').length === 0) { return; }

      // create data structure
      this.conf.talks.push({
        speaker: $el.find('.speaker-link').text().trim(),
        talk: $el.find('h2').text().trim(),
        url: `http://aneventapart.com${$el.find('.speaker-link').attr('href')}`,
      });
    });
  },
});
