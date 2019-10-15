# 📝 TakeNote

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-) [![Build Status](https://travis-ci.org/taniarascia/takenote.svg?branch=master)](https://travis-ci.org/taniarascia/takenote) [![Coverage Status](https://coveralls.io/repos/github/taniarascia/takenote/badge.svg?branch=master)](https://coveralls.io/github/taniarascia/takenote?branch=master)

> Work in progress

A web-based note-taking app with GitHub sync and Markdown support.

![Screenshot](./screenshot.png)

## Installation

```bash
git clone git@github.com:taniarascia/takenote
cd takenote
npm i
npm start
```

## Features

- [x] Plain text notes with Markdown highlighting and frontmatter metadata
- [x] Add, update, download, temporarily delete and delete notes
- [x] Add, update, and delete categories
- [x] Add notes to categories or mark note as favorite
- [x] Keybinding shortcuts for common actions
- [ ] Settings for light/dark mode, sync frequency, and Vim mode
- [ ] Sync and store notes in GitHub gist (currently local storage)

## Contributing

TakeNote is an open source project, and contributions of any kind are welcome! Open issues, bugs, and enhancements are all listed on the [issues](https://github.com/taniarascia/takenote/issues) tab and labeled accordingly. Feel free to open bug tickets and make feature requests. Easy bugs and features will be tagged with the `good first issue` label.

The project is written in TypeScript, React and Redux. TypeScript is set to strict mode, with no implicit any allowed. The formatting style for the project is set by Prettier.

### Data Seed

To seed the app with some test data, paste the contents of `seed.js` into your browser console and refresh.

## Contributors

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://www.taniarascia.com"><img src="https://avatars3.githubusercontent.com/u/11951801?v=4" width="50px;" alt="Tania Rascia"/><br /><sub><b>Tania Rascia</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=taniarascia" title="Code">💻</a> <a href="#ideas-taniarascia" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/taniarascia/takenote/issues?q=author%3Ataniarascia" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/hankolsen"><img src="https://avatars3.githubusercontent.com/u/1008390?v=4" width="50px;" alt="hankolsen"/><br /><sub><b>hankolsen</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=hankolsen" title="Code">💻</a> <a href="https://github.com/taniarascia/takenote/issues?q=author%3Ahankolsen" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/joseph-perez"><img src="https://avatars0.githubusercontent.com/u/7772649?v=4" width="50px;" alt="Joseph Perez"/><br /><sub><b>Joseph Perez</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=joseph-perez" title="Code">💻</a></td>
    <td align="center"><a href="https://cutting.scot"><img src="https://avatars0.githubusercontent.com/u/118328?v=4" width="50px;" alt="Paul"/><br /><sub><b>Paul</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=dagda1" title="Code">💻</a> <a href="https://github.com/taniarascia/takenote/commits?author=dagda1" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://martinbrosenberg.com/"><img src="https://avatars2.githubusercontent.com/u/2382147?v=4" width="50px;" alt="Martin Rosenberg"/><br /><sub><b>Martin Rosenberg</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=MartinRosenberg" title="Code">💻</a> <a href="https://github.com/taniarascia/takenote/issues?q=author%3AMartinRosenberg" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://codepen.io/meowwwls"><img src="https://avatars3.githubusercontent.com/u/16426195?v=4" width="50px;" alt="Melissa"/><br /><sub><b>Melissa</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=meowwwls" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jjtowle"><img src="https://avatars0.githubusercontent.com/u/41359068?v=4" width="50px;" alt="Jason Towle"/><br /><sub><b>Jason Towle</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=jjtowle" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://blog.isquaredsoftware.com"><img src="https://avatars1.githubusercontent.com/u/1128784?v=4" width="50px;" alt="Mark Erikson"/><br /><sub><b>Mark Erikson</b></sub></a><br /><a href="#ideas-markerikson" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://www.alphonsebouy.fr"><img src="https://avatars2.githubusercontent.com/u/32797759?v=4" width="50px;" alt="Alphonse Bouy"/><br /><sub><b>Alphonse Bouy</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/issues?q=author%3Aalphonseb" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/dave2kb"><img src="https://avatars1.githubusercontent.com/u/30696030?v=4" width="50px;" alt="dave2kb"/><br /><sub><b>dave2kb</b></sub></a><br /><a href="#design-dave2kb" title="Design">🎨</a> <a href="#ideas-dave2kb" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Author

- [Tania Rascia](https://www.taniarascia.com)

## License

This project is open source and available under the [MIT License](LICENSE).
