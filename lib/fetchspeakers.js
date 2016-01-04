'use strict';

/**
 * Module dependencies
 */
const fs = require('fs');
const cheerio = require('cheerio');
const mustache = require('mustache');
const promise = require('bluebird');
const request = require('request-promise');
const logger = require('./logger');

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
 * Expose module.
 */
module.exports = {
  /**
   * Initial setup.
   *
   * @param {Object} conf - Conference details.
   * @param {String} conf.abbr - Conference abbreviation.
   * @param {String} conf.url - URL to request.
   * @param {String} conf.name - Conference name.
   */
  init(conf) {
    this.conf = conf;
    this.conf.talks = [];
    this.getData();
  },

  /**
   * Makes http request to specified URL.
   */
  getData() {
    request(this.conf.url)
      .then((html) => {
        this.parseSchedule(cheerio.load(html));
        logger.log('success', `Finished scraping ${this.conf.url}`);
        this.renderOutput();
      })
      .catch((error) => {
        logger.log('error', error);
      });
  },

  /**
   * Passes the results data through the mustache
   * template and then generates a markdown file.
   */
  renderOutput() {
    const dir = './notes';
    const output = `${dir}/notes-${this.conf.abbr}.md`;
    let markdown = null;

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
  },
};
