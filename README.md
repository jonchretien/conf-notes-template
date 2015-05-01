# Conference Notes Template

A quick node script to convert program and speaker data to Markdown files for my conference notes. Current lineup:

| Conference                                                     | Key        |
| :------------------------------------------------------------- | :--------- |
| [An Event Apart](http://aneventapart.com/)                     | `aea`      |
| [BrooklynJS](http://brooklynjs.com/)                           | `bjs`      |
| [CascadiaCSS](http://2015.cascadiajs.com/css/)                 | `cf1`      |
| [CascadiaJS: Browser Day](http://2015.cascadiajs.com/browser/) | `cf2`      |
| [CascadiaJS: Server Day](http://2015.cascadiajs.com/server/)   | `cf3`      |
| [EmpireJS](http://empirejs.org/)                               | `ejs`      |
| [JSConf Budapest](http://jsconfbp.com/)                        | `jsconfhu` |
| [JSConf US](http://2015.jsconf.us/speakers.html)               | `jsconfus` |
| [ManhattanJS](http://manhattanjs.com/)                         | `mjs`      |
| [OpenVis Conf](http://openvisconf.com/)                        | `vis`      |

## Example

Pass the conference alias as an argument when running `index.js`:

```bash
./index.js aea
```

A `notes` folder will be created with a `notes-aea.md` file.