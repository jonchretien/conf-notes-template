'use strict';

/**
 * Module dependencies
 */
let cheerio = require('cheerio');
let FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for CSSConf (`csscs`).
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.talks - List of talks.
 * @constructor
 * @extends {FetchSpeakers}
 */
let FetchCSSConf = module.exports = function(conf) {
  FetchSpeakers.call(this, conf);
};

/**
 * Make a new `FetchCSSConf.prototype` linked to `FetchSpeakers.prototype`.
 */
FetchCSSConf.prototype = Object.create(FetchSpeakers.prototype);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchCSSConf.prototype.parseSchedule = function(html) {
  let $ = cheerio.load(html);

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
