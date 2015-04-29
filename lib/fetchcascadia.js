/**
 * Module dependencies
 */
var cheerio = require('cheerio');
var FetchSpeakers = require('./fetchspeakers');

/**
 * Expose `FetchCascadiaFest`.
 */
module.exports = FetchCascadiaFest;

/**
 * Parses speaker data for CascadiaJS.
 *
 * @param {String} name - Conference name.
 * @param {String} url - URL to request.
 * @constructor
 * @extends {FetchSpeakers}
 */
function FetchCascadiaFest(name, url) {
  this.name = name;
  this.url = url;
};

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchCascadiaFest.prototype = new FetchSpeakers();

/**
 * Parses through the speaker schedule and creates
 * a new data structure to pass to the mustache template.
 *
 * @param {String} html
 */
FetchCascadiaFest.prototype.parseSchedule = function(html) {
  var $ = cheerio.load(html);

  $('.speaker').each(function(i, el) {
    var $el = $(el);

    // create data structure
    this.results.push({
      speaker: $el.find('h4').text().trim(),
      talk: $el.find('p').text().trim()
    });
  }.bind(this));
};
