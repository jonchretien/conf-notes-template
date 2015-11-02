'use strict';

/**
 * Module dependencies
 */
let FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for JSConf Budapest (`jschu`).
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.talks - List of talks.
 * @constructor
 * @extends {FetchSpeakers}
 */
let FetchJSConfHU = module.exports = function(conf) {
  FetchSpeakers.call(this, conf);
};

/**
 * Make a new `FetchJSConfHU.prototype` linked to `FetchSpeakers.prototype`.
 */
FetchJSConfHU.prototype = Object.create(FetchSpeakers.prototype);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchJSConfHU.prototype.parseSchedule = function(html) {
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
