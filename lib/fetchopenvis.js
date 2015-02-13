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
 * Parses speaker data for OpenVis Conf.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchOpenVis = module.exports = function() {
  this.url = 'http://openvisconf.com';
};

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchOpenVis.prototype = new FetchSpeakers();

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchOpenVis.prototype.parseSchedule = function(html) {
  var $ = cheerio.load(html);

  $('.speaker').each(function(i, el) {
    var $el = $(el);

    // create data structure
    this.results.push({
      speaker: $el.find('.speaker-name').text(),
      talk: $el.find('.speaker-talk').text(),
      url: $el.find('.speaker_bio a:first-child').attr('href')
    });
  }.bind(this));

  logger.log('info', 'Finished scraping ' + this.url);
};
