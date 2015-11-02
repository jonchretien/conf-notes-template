'use strict';

/**
 * Module dependencies
 */
let FetchSpeakers = require('./fetchspeakers');

/**
 * Create link to `FetchSpeakers`.
 */
let FetchCSSConf = module.exports = Object.create(FetchSpeakers);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchCSSConf.parseSchedule = function(html) {
  let $ = this.cheerio.load(html);

  $('.people-col').find('.speaker-entity').each((i, el) => {
    let $el = $(el);

    // create data structure
    this.conf.talks.push({
      speaker: $el.find('.speaker a').text().trim(),
      talk: $el.find('.speaker').next('h2').text().trim(),
      url: $el.find('.speaker a').attr('href'),
    });
  });
};
