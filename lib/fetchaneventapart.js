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
 * Parses speaker data for An Event Apart.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchAnEventApart = module.exports = function() {
  this.url = 'http://aneventapart.com/event/washington-dc-2014';
};

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchAnEventApart.prototype = new FetchSpeakers();

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchAnEventApart.prototype.parseSchedule = function(html) {
  var $ = cheerio.load(html);

  $('.single-session').each(function(i, el) {
    var $el = $(el);

    // skip cells without speaker info
    if ($el.find('.speaker-link').length === 0) { return; }

    // create data structure
    this.results.push({
      speaker: $el.find('.speaker-link').text(),
      talk: $el.find('h2').text(),
      url: 'http://aneventapart.com' + $el.find('.speaker-link').attr('href')
    });
  }.bind(this));

  logger.log('info', 'Finished scraping ' + this.url);
};
