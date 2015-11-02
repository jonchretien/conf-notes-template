'use strict';

/**
 * Module dependencies
 */
let cheerio = require('cheerio');
let FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for BrooklynJS (`bjs`).
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.talks - List of talks.
 * @constructor
 * @extends {FetchSpeakers}
 */
let FetchBrooklynJS = module.exports = function(conf) {
  FetchSpeakers.call(this, conf);
};

/**
 * Make a new `FetchBrooklynJS.prototype` linked to `FetchSpeakers.prototype`.
 */
FetchBrooklynJS.prototype = Object.create(FetchSpeakers.prototype);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchBrooklynJS.prototype.parseSchedule = function(html) {
  let $ = cheerio.load(html);

  $('.speaker').each((i, el) => {
    let $el = $(el);

    // create data structure
    this.conf.talks.push({
      speaker: $el.find('div').text().trim(),
      talk: $el.find('small').text().trim(),
      url: $el.find('div > a').attr('href'),
    });
  });
};
