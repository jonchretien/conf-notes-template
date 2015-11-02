'use strict';

/**
 * Module dependencies
 */
let FetchSpeakers = require('./fetchspeakers');

/**
 * Create link to `FetchSpeakers`.
 */
let FetchJSConfHU = module.exports = Object.create(FetchSpeakers);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchJSConfHU.parseSchedule = function(html) {
  let $ = this.cheerio.load(html);

  $('.topics').find('.topic').each((i, el) => {
    let $el = $(el);

    // create data structure
    this.conf.talks.push({
      speaker: $el.find('.meta h4').text().trim(),
      talk: $el.find('.meta h3').text().trim(),
      url: $el.find('.twitter').attr('href'),
    });
  });
};
