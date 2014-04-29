/*
 * Module dependencies
 */
var cheerio = require('cheerio'),
    FetchSpeakers = require('./fetchspeakers');

/**
 * Creates constructor function.
 *
 * @constructor
 */
var FetchEmpireJS = module.exports = function() {
  this.url = 'http://2014.empirejs.org/';
}

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchEmpireJS.prototype = new FetchSpeakers();

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchEmpireJS.prototype.parseSchedule = function(html) {
  var _this = this,
      $ = cheerio.load(html);

  $('#schedule tbody td').each(function(i, el) {
    var $el = $(el);

    // skip cells without speaker info
    if ($el.find('speaker').length === 0) { return; }

    // create data structure
    _this.results.push({
      speaker: $el.find('speaker').text().trim(),
      talk: $el.find('talk').text(),
      url: $el.find('speaker a').attr('href')
    });
  });

  console.log(this.logs.scrape);
};
