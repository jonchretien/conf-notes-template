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
 * Parses speaker data for EmpireJS.
 * @constructor
 * @extends {FetchSpeakers}
 */
var FetchEmpireJS = module.exports = function() {
  this.url = 'http://2014.empirejs.org/';
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

  $('#schedule tbody td').each(function(i, el) {
    var $el = $(el);

    // skip cells without speaker info
    if ($el.find('speaker').length === 0) { return; }

    var parseMultipleSpeakers = function() {
      var names = [];

      $el.find('speaker a').each(function(index, element) {
        names.push($(element).text());
      });

      return names.join(' & ');
    };

    // create data structure
    this.results.push({
      speaker: $el.find('speaker a').length > 1 ? parseMultipleSpeakers() : $el.find('speaker').text().trim(),
      talk: $el.find('talk').text(),
      url: $el.find('speaker a').attr('href')
    });
  }.bind(this));

  logger.log('info', 'Finished scraping ' + this.url);
};
