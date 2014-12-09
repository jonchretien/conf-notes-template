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
  var $ = cheerio.load(html);

  $('.speaker').each(function(i, el) {
    var $el = $(el);

    // create data structure
    this.results.push({
      speaker: $el.find('div').text(),
      talk: $el.find('small').text(),
      url: $el.find('div > a').attr('href')
    });
  }.bind(this));

  logger.log('info', 'Finished scraping ' + this.url);
};
