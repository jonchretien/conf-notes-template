'use strict';

/**
 * Module dependencies
 */
let cheerio = require('cheerio');
let FetchSpeakers = require('./fetchspeakers');

/**
 * Parses speaker data for EmpireJS (`ejs`).
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.talks - List of talks.
 * @constructor
 * @extends {FetchSpeakers}
 */
let FetchEmpireJS = module.exports = function(conf) {
  FetchSpeakers.call(this, conf);
};

/**
 * Make a new `FetchEmpireJS.prototype` linked to `FetchSpeakers.prototype`.
 */
FetchEmpireJS.prototype = Object.create(FetchSpeakers.prototype);

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchEmpireJS.prototype.parseSchedule = function(html) {
  let $ = cheerio.load(html);

  $('#section-speakers .speaker').each((i, el) => {
    let $el = $(el);

    // create data structure
    this.conf.talks.push({
      speaker: $el.find('.speaker-name').text().trim(),
      talk: $el.find('.speaker-title').text().trim(),
      url: $el.find('a').attr('href'),
    });
  });
};
