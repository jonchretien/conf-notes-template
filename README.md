# Conference Notes Template

A quick node script to convert program and speaker data to Markdown files for my conference notes. Current lineup:

| Conference                                                     | Key        |
| :------------------------------------------------------------- | :--------- |
| [An Event Apart (2014)](http://aneventapart.com/)                     | `aea`      |
| [BrooklynJS](http://brooklynjs.com/)                           | `bjs`      |
| [CascadiaCSS (2015)](http://2015.cascadiajs.com/css/)                 | `cf1`      |
| [CascadiaJS: Browser Day (2015)](http://2015.cascadiajs.com/browser/) | `cf2`      |
| [CascadiaJS: Server Day (2015)](http://2015.cascadiajs.com/server/)   | `cf3`      |
| [EmpireJS (2015)](http://empirejs.org/)                               | `ejs`      |
| [JSConf Budapest (2015)](http://jsconfbp.com/)                        | `jschu` |
| [JSConf US (2015)](http://2015.jsconf.us/speakers.html)               | `jscus` |
| [ManhattanJS](http://manhattanjs.com/)                         | `mjs`      |
| [OpenVis Conf (2015)](http://openvisconf.com/)                        | `vis`      |

## Instructions

Clone the GitHub repo and navigate to the newly created folder.
```bash
git clone https://github.com/jonchretien/conf-notes-template.git && cd conf-notes-template
```

Install NPM packages.
```bash
npm install
```

Pass the conference alias as an argument when running `index.js`. In this example, a `notes` folder will be created with a `notes-aea.md` file.
```bash
./index.js aea
```