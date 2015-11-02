'use strict';

/**
 * Module dependencies
 */
let fs = require('fs');
let cheerio = require('cheerio');
let mustache = require('mustache');
let promise = require('bluebird');
let request = require('request-promise');
let logger = require('./logger');

/**
 * Promisify `fs`.
 */
promise.promisifyAll(fs);


/**
 * Hack to allow requests from secure sites.
 * http://stackoverflow.com/questions/18461979/node-js-error-with-ssl-unable-to-verify-leaf-signature
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/**
 * Handles HTTP request with provided URL and renders markdown file with results.
 *
 * @param {Object} conf - Conference details.
 * @param {String} conf.abbr - Conference abbreviation.
 * @param {String} conf.url - URL to request.
 * @param {String} conf.name - Conference name.
 * @param {Array} conf.talks - List of talks.
 * @constructor
 */
let FetchSpeakers = module.exports = function(conf) {
  this.conf = conf;
  this.cheerio = cheerio;
};

/*
 * Makes http request to specified URL.
 */
FetchSpeakers.prototype.getData = function() {
  request(this.conf.url)
    .then((html) => {
      this.parseSchedule(html);
      logger.log('success', `Finished scraping ${this.conf.url}`);
      this.renderOutput();
    })
    .catch((error) => {
      logger.log('error', error);
    });
};

/**
 * Passes the results data through the mustache
 * template and then generates a markdown file.
 */
FetchSpeakers.prototype.renderOutput = function() {
  let dir = './notes';
  let output = `${dir}/notes-${this.conf.abbr}.md`;
  let markdown;

  fs.readFileAsync('template/tmpl.mustache', 'utf8')
    .then((data) => {
      markdown = mustache.to_html(data, {
        conference: this.conf.name,
        talks: this.conf.talks,
      });
      logger.log('success', 'Ran data through markdown template.');
    })
    .then(() => {
      fs.mkdirAsync(dir, (err) => {
        if (err) {
          logger.log('info', `${dir} folder already exists.`);
        }
      });
    })
    .then(() => {
      fs.writeFileAsync(output, markdown);
      logger.log('success', `Created ${output}`);
    })
    .catch((err) => {
      logger.log('error', err);
    })
    .done();
};
