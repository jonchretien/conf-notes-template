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
 * Expose `FetchBrooklynJS`.
 */
module.exports = FetchBrooklynJS;

/**
 * Parses speaker data for BrooklynJS.
 *
 * @param {String} name - Conference name.
 * @param {String} url - URL to request.
 * @constructor
 * @extends {FetchSpeakers}
 */
function FetchBrooklynJS(name, url) {
  this.name = name;
  this.url = url;
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
