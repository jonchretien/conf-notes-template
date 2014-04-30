/**
 * Module dependencies
 */
var cheerio = require('cheerio'),
    FetchSpeakers = require('./fetchspeakers');

/**
 * Creates constructor function.
 *
 * @constructor
 */
var FetchManhattanJS = module.exports = function() {
  this.url = 'http://manhattanjs.com/';
};

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchManhattanJS.prototype = new FetchSpeakers();

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchManhattanJS.prototype.parseSchedule = function(html) {
  var _this = this,
      $ = cheerio.load(html);

  $('.speaker').each(function(i, el) {
    var $el = $(el);

    // create data structure
    _this.results.push({
      speaker: $el.find('.speaker-name').text(),
      talk: $el.find('p').text(),
      url: $el.find('a:first-child').attr('href')
    });
  });

  console.log(this.logs.scrape);
};
