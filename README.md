# Conference Notes Template

An app that converts program and speaker data to Markdown files for my conference notes. Current lineup:

Conference                                                  | Year | Key
:---------------------------------------------------------- | :--- | :------
[An Event Apart](http://aneventapart.com/)                  | 2014 | `aea`
[BrooklynJS](http://brooklynjs.com/)                        | 2016 | `bjs`
[CascadiaCSS](http://2015.cascadiajs.com/css/)              | 2015 | `cf1`
[CascadiaJS (Browser)](http://2015.cascadiajs.com/browser/) | 2015 | `cf2`
[CascadiaJS (Server)](http://2015.cascadiajs.com/server/)   | 2015 | `cf3`
[CSSConf](https://2015.cssconf.com)                         | 2015 | `csscf`
[EmpireJS](http://empirejs.org/)                            | 2016 | `ejs`
[JSConf Budapest](http://jsconfbp.com/)                     | 2015 | `jschu`
[JSConf US](http://2015.jsconf.us/speakers.html)            | 2015 | `jscus`
[ManhattanJS](http://manhattanjs.com/)                      | 2016 | `mjs`
[OpenVis Conf](https://openvisconf.com)                     | 2016 | `vis`
[Smashing Conference](http://smashingconf.com/speakers)     | 2015 | `smcf`

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

*Note:* the app requires a minimum Node version of `4.0.0`.

## Linting

```bash
npm run lint
```
