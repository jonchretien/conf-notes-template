#!/usr/bin/env node

// required modules
var fs = require('fs'),
    request = require('request'),
    mustache = require('mustache');

// declare variables
var file = fs.readFileSync('data/speakers.json', 'utf8'),
    regex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/,
    json = JSON.parse(file),
    result = [],
    template = 'templates/tmpl.mustache',
    markdown, page;

// create new data structure
Object.keys(json).forEach(function(day) {
  json[day].map(function(val) {
    // skip arrays with empty strings or with greeting text
    if (!val.name[0] || val.name[0].indexOf('great') !== -1) { return; }

    result.push({
      speaker: val.name.join(',').replace(/,/, ' & '), // handles multiple speakers
      talk: val.title,
      url: (val.bio.search(regex) !== -1) ? val.bio.match(regex).shift() : null,
      day: day
    });
  });
});

// load mustache template
page = fs.readFileSync(template, 'utf8');

// populate template with data
markdown = mustache.to_html(page, { talks: result });

// write to new file
fs.writeFileSync('notes.md', markdown);
