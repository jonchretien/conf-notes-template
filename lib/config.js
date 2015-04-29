/**
 * Module dependencies
 */
var FetchAnEventApart = require('./fetchaneventapart');
var FetchBrooklynJS = require('./fetchbrooklyn');
var FetchCascadiaFest = require('./fetchcascadia');
var FetchEmpireJS = require('./fetchempire');
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
  'ejs': {
    'conference': 'EmpireJS',
    'fetch': FetchEmpireJS,
    'url': 'http://empirejs.org/'
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
