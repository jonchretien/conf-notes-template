'use strict';

/**
 * Module dependencies
 */
const FetchAnEventApart = require('./fetchaneventapart');
const FetchBrooklynJS = require('./fetchbrooklyn');
const FetchCascadiaFest = require('./fetchcascadia');
const FetchCSSConf = require('./fetchcssconf');
const FetchEmpireJS = require('./fetchempire');
const FetchJSConfHU = require('./fetchjsconfhu');
const FetchJSConfUS = require('./fetchjsconfus');
const FetchManhattanJS = require('./fetchmanhattan');
const FetchOpenVis = require('./fetchopenvis');
const FetchSmashingConf = require('./fetchsmashingconf');

/**
 * Conference details.
 */
module.exports = {
  'aea': {
    'conference': 'An Event Apart',
    'fetch': FetchAnEventApart,
    'url': 'http://aneventapart.com/event/washington-dc-2014',
  },
  'bjs': {
    'conference': 'BrooklynJS',
    'fetch': FetchBrooklynJS,
    'url': 'http://brooklynjs.com/',
  },
  'cf1': {
    'conference': 'CascadiaFest (CSS)',
    'fetch': FetchCascadiaFest,
    'url': 'http://2015.cascadiajs.com/css/',
  },
  'cf2': {
    'conference': 'CascadiaFest (JS: Browser Day)',
    'fetch': FetchCascadiaFest,
    'url': 'http://2015.cascadiajs.com/browser/',
  },
  'cf3': {
    'conference': 'CascadiaFest (JS: Server Day)',
    'fetch': FetchCascadiaFest,
    'url': 'http://2015.cascadiajs.com/server/',
  },
  'csscf': {
    'conference': 'CSSConf',
    'fetch': FetchCSSConf,
    'url': 'https://2015.cssconf.com',
  },
  'ejs': {
    'conference': 'EmpireJS',
    'fetch': FetchEmpireJS,
    'url': 'http://empirejs.org/',
  },
  'jschu': {
    'conference': 'JSConf Budapest',
    'fetch': FetchJSConfHU,
    'url': 'http://jsconfbp.com/',
  },
  'jscus': {
    'conference': 'JSConfUS',
    'fetch': FetchJSConfUS,
    'url': 'http://2015.jsconf.us/speakers.html',
  },
  'mjs': {
    'conference': 'ManhattanJS',
    'fetch': FetchManhattanJS,
    'url': 'http://manhattanjs.com/',
  },
  'smcf': {
    'conference': 'Smashing Conference',
    'fetch': FetchSmashingConf,
    'url': 'http://smashingconf.com/speakers',
  },
  'vis': {
    'conference': 'OpenVis Conf',
    'fetch': FetchOpenVis,
    'url': 'https://openvisconf.com/',
  },
};
