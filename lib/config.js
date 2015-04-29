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
    'fetch': FetchAnEventApart,
    'url': 'http://aneventapart.com/event/washington-dc-2014'
  },
  'bjs': {
    'fetch': FetchBrooklynJS,
    'url': 'http://brooklynjs.com/'
  },
  'ccss': {
    'fetch': FetchCascadiaFest,
    'url': 'http://2015.cascadiajs.com/css/'
  },
  'cjs1': {
    'fetch': FetchCascadiaFest,
    'url': 'http://2015.cascadiajs.com/browser/'
  },
  'cjs2': {
    'fetch': FetchCascadiaFest,
    'url': 'http://2015.cascadiajs.com/server/'
  },
  'ejs': {
    'fetch': FetchEmpireJS,
    'url': 'http://empirejs.org/'
  },
  'mjs': {
    'fetch': FetchManhattanJS,
    'url': 'http://manhattanjs.com/'
  },
  'vis': {
    'fetch': FetchOpenVis,
    'url': 'http://openvisconf.com'
  }
};

/**
 * Expose `Config`.
 */
module.exports = Config;
