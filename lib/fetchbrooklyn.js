/**
 * Module dependencies
 */
var cheerio = require('cheerio'),
    FetchSpeakers = require('./fetchspeakers'),
    Logger = require('./logger');

/**
 * Create instance of Logger class.
 */
var logger = new Logger();

/**
 * Parses speaker data for BrooklynJS.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchBrooklynJS = module.exports = function() {
  this.url = 'http://brooklynjs.com/';
};

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchBrooklynJS.prototype = new FetchSpeakers();

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchBrooklynJS.prototype.parseSchedule = function(html) {
  var _this = this,
      $ = cheerio.load(html);

  $('.speaker').each(function(i, el) {
    var $el = $(el);

    // create data structure
    _this.results.push({
      speaker: $el.find('.div').text(),
      talk: $el.find('small').text(),
      url: $el.find('div > a').attr('href')
    });
  });

  logger.log('info', 'Finished scraping ' + _this.url);
};
