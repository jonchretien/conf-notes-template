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
 * Parses speaker data for EmpireJS.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchEmpireJS = module.exports = function() {
  this.url = 'http://empirejs.org/';
};

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
  var $ = cheerio.load(html);

  $('#section-speakers .speaker').each(function(i, el) {
    var $el = $(el);

    // create data structure
    this.results.push({
      speaker: $el.find('.speaker-name').text(),
      talk: $el.find('.speaker-title').text(),
      url: $el.find('a').attr('href')
    });
  }.bind(this));

  logger.log('info', 'Finished scraping ' + this.url);
};
