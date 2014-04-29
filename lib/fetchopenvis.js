/*
 * Module dependencies
 */
var fs = require('fs'),
    FetchSpeakers = require('./fetchspeakers');

/**
 * Creates constructor function.
 *
 * @constructor
 */
var FetchOpenVis = module.exports = function() {
  this.file = fs.readFileSync('data/speakers.json', 'utf8');
  this.json = JSON.parse(this.file);
  this.regex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/;
  this.url = 'http://openvisconf.com/';
}

/**
 * Attach to FetchSpeakers' prototype.
 */
FetchOpenVis.prototype = new FetchSpeakers();

/**
 * Iterates through JSON file downloaded from
 * OpenVis and creates new data structure.
 */
FetchOpenVis.prototype.parseSchedule = function() {
  var _this = this;

  // create new data structure
  Object.keys(this.json).forEach(function(day) {
    _this.json[day].map(function(val) {
      // skip arrays with empty strings or with greeting text
      if (!val.name[0] || val.name[0].indexOf('great') !== -1) { return; }

      _this.results.push({
        speaker: val.name.join(' & '), // for multiple speakers
        talk: val.title,
        url: (val.bio.search(_this.regex) !== -1) ? val.bio.match(_this.regex).shift() : null,
        day: day
      });
    });
  });
};
