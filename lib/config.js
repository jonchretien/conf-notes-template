'use strict;'

/**
 * Module dependencies
 */
var FetchAnEventApart = require('./fetchaneventapart');
var FetchBrooklynJS = require('./fetchbrooklyn');
var FetchCascadiaFest = require('./fetchcascadia');
var FetchCSSConf = require('./fetchcssconf');
var FetchEmpireJS = require('./fetchempire');
var FetchJSConfHU = require('./fetchjsconfhu');
var FetchJSConfUS = require('./fetchjsconfus');
var FetchManhattanJS = require('./fetchmanhattan');
var FetchOpenVis = require('./fetchopenvis');

/**
 * Config for conferences.
 */
var Config = {
  'aea': {
    'conference': 'An Event Apart',
    'fetch': FetchAnEventApart,
    'url': 'http://aneventapart.com/event/washington-dc-2014'
  },
  'bjs': {
    'conference': 'BrooklynJS',
    'fetch': FetchBrooklynJS,
    'url': 'http://brooklynjs.com/'
  },
  'cf1': {
    'conference': 'CascadiaFest (CSS)',
    'fetch': FetchCascadiaFest,
    'url': 'http://2015.cascadiajs.com/css/'
  },
  'cf2': {
    'conference': 'CascadiaFest (JS: Browser Day)',
    'fetch': FetchCascadiaFest,
    'url': 'http://2015.cascadiajs.com/browser/'
  },
  'cf3': {
    'conference': 'CascadiaFest (JS: Server Day)',
    'fetch': FetchCascadiaFest,
    'url': 'http://2015.cascadiajs.com/server/'
  },
  'csscf': {
    'conference': 'CSSConf',
    'fetch': FetchCSSConf,
    'url': 'https://2015.cssconf.com'
  },
  'ejs': {
    'conference': 'EmpireJS',
    'fetch': FetchEmpireJS,
    'url': 'http://empirejs.org/'
  },
  'jschu': {
    'conference': 'JSConf Budapest',
    'fetch': FetchJSConfHU,
    'url': 'http://jsconfbp.com/'
  },
  'jscus': {
    'conference': 'JSConfUS',
    'fetch': FetchJSConfUS,
    'url': 'http://2015.jsconf.us/speakers.html'
  },
  'mjs': {
    'conference': 'ManhattanJS',
    'fetch': FetchManhattanJS,
    'url': 'http://manhattanjs.com/'
  },
  'vis': {
    'conference': 'OpenVis Conf',
    'fetch': FetchOpenVis,
    'url': 'http://openvisconf.com'
  }
};

/**
 * Expose `Config`.
 */
module.exports = Config;
