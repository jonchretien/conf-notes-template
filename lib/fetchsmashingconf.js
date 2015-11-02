'use strict';

/**
 * Module dependencies
 */
let FetchSpeakers = require('./fetchspeakers');

/**
 * Create link to `FetchSpeakers`.
 */
let FetchSmashingConf = module.exports = Object.create(FetchSpeakers);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchSmashingConf.parseSchedule = function(html) {
  let $ = this.cheerio.load(html);

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
};
