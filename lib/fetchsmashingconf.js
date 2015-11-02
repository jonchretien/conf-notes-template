'use strict';

/**
 * Module dependencies
 */
let cheerio = require('cheerio');
let FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for Smashing Conference.
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.talks - List of talks.
 * @constructor
 * @extends {FetchSpeakers}
 */
let FetchSmashingConf = module.exports = function(conf) {
  FetchSpeakers.call(this, conf);
};

/**
 * Make a new `FetchSmashingConf.prototype` linked to `FetchSpeakers.prototype`.
 */
FetchSmashingConf.prototype = Object.create(FetchSpeakers.prototype);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchSmashingConf.prototype.parseSchedule = function(html) {
  let $ = cheerio.load(html);

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
