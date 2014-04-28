#!/usr/bin/env node

// import modules
var cheerio = require('cheerio'),
    fs = require('fs'),
    mustache = require('mustache'),
    request = require('request');

// declare variables
var file = fs.readFileSync('data/speakers.json', 'utf8'),
    regex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/,
    json = JSON.parse(file),
    results = [],
    template = 'templates/tmpl.mustache',
    $, arg, conference, conferences, markdown, page;

// conference data
conferences = {
  'bk': {
    url: 'http://brooklynjs.com/'
  },
  'emp': {
    url: 'http://2014.empirejs.org/'
  },
  'manhattan': {
    url: 'http://manhattanjs.com/'
  }
};

// control flow
arg = process.argv.slice(2);
conference = conferences[arg[0]];

switch (arg[0]) {
  case 'bk':
    scrapeBrooklynJS(conference.url);
    break;
  case 'emp':
    scrapeEmpireJS(conference.url);
    break;
  case 'manhattan':
    scrapeManhattanJS(conference.url);
    break;
  case 'vis':
    parseOpenVisData();
    break;
 default:
    console.log('You must pass an argument.');
}

/**
 * Scrapes the EmpireJS website, parses through the speaker info,
 * and creates a new data structure to pass to the mustache template.
 * Also calls createMarkdownFile();
 *
 * @param {String} url
 */
function scrapeEmpireJS(url) {
  request(url, function (error, response, html) {
    if (!error && response.statusCode === 200) {
      console.log('Finished scraping EmpireJS.');
      $ = cheerio.load(html);

      $('#schedule tbody td').each(function(i, el) {
        var $el = $(el);

        // skip cells without speaker info
        if ($el.find('speaker').length === 0) { return; }

        // create data structure
        results.push({
          speaker: $el.find('speaker').text().trim(),
          talk: $el.find('talk').text(),
          url: $el.find('speaker a').attr('href')
        });
      });

      createMarkdownFile();
    }
  });
}

/**
 * Scrapes the ManhattanJS website, parses through the speaker info,
 * and creates a new data structure to pass to the mustache template.
 * Also calls createMarkdownFile();
 *
 * @param {String} url
 */
function scrapeManhattanJS(url) {
  request(url, function (error, response, html) {
    if (!error && response.statusCode === 200) {
      console.log('Finished scraping ManhattanJS.');
      $ = cheerio.load(html);

      $('.speaker').each(function(i, el) {
        var $el = $(el);

        // create data structure
        results.push({
          speaker: $el.find('.speaker-name').text(),
          talk: $el.find('p').text(),
          url: $el.find('a:first-child').attr('href')
        });
      });

      createMarkdownFile();
    }
  });
}

/**
 * Scrapes the BrooklynJS website, parses through the speaker info,
 * and creates a new data structure to pass to the mustache template.
 * Also calls createMarkdownFile();
 *
 * @param {String} url
 */
function scrapeBrooklynJS(url) {
  request(url, function (error, response, html) {
    if (!error && response.statusCode === 200) {
      console.log('Finished scraping BrooklynJS.');
      $ = cheerio.load(html);

      $('.speaker').each(function(i, el) {
        var $el = $(el);

        // create data structure
        results.push({
          speaker: $el.find('.div').text(),
          talk: $el.find('small').text(),
          url: $el.find('div > a').attr('href')
        });
      });

      createMarkdownFile();
    }
  });
}

/**
 * Iterates through JSON file downloaded from
 * OpenVis and creates new data structure.
 * Also calls createMarkdownFile();
 */
function parseOpenVisData() {
  // create new data structure
  Object.keys(json).forEach(function(day) {
    json[day].map(function(val) {
      // skip arrays with empty strings or with greeting text
      if (!val.name[0] || val.name[0].indexOf('great') !== -1) { return; }

      results.push({
        speaker: val.name.join(' & '), // for multiple speakers
        talk: val.title,
        url: (val.bio.search(regex) !== -1) ? val.bio.match(regex).shift() : null,
        day: day
      });
    });
  });

  createMarkdownFile();
}

/**
 * Passes the results data through the mustache
 * template and then generates a markdown file.
 */
function createMarkdownFile() {
  // load mustache template
  page = fs.readFileSync(template, 'utf8');

  // populate template with data
  markdown = mustache.to_html(page, { talks: results });

  // write to new file
  fs.writeFileSync('notes.md', markdown);
}
