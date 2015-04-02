/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');
var Logger = require('./logger');

/**
 * Create instance of Logger class.
 */
var logger = new Logger();

/**
 * Parses speaker data for ManhattanJS.
 *
 * @param {String} name - Conference name.
 * @param {String} url - URL to request.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchManhattanJS = module.exports = function(name, url) {
  this.name = name;
  this.url = url;
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
  var $ = cheerio.load(html);

  $('.speaker').each(function(i, el) {
    var $el = $(el);

    // create data structure
    this.results.push({
      speaker: $el.find('.speaker-name').text(),
      talk: $el.find('p').text(),
      url: $el.find('a:first-child').attr('href')
    });
  }.bind(this));

  logger.log('info', 'Finished scraping ' + this.url);
};
