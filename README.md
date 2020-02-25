<p align="center">
  <img src="./assets/logo.png">
</p>

<p align="center">
 <img src="https://img.shields.io/badge/License-MIT-blue.svg">
   <a href="https://travis-ci.org/taniarascia/takenote"><img src="https://travis-ci.org/taniarascia/takenote.svg?branch=master"></a>
   <a href="https://coveralls.io/github/taniarascia/takenote?branch=master"><img src="https://coveralls.io/repos/github/taniarascia/takenote/badge.svg?branch=master"></a>
</p>

<p align="center">A web-based note-taking app with GitHub sync and Markdown support. (WIP)</p>

> **Warning**: TakeNote is still in active development. You can visit [takenote.dev](https://takenote.dev) to see the work in progress, but your account and the notes you create are **temporary** will not be persisted. All data will be lost once GitHub integration is complete.

![Screenshot](./assets/screenshot-light.png)

### Fast and simple

TakeNote was made by developers for developers - a simple, plain-text note-taking app for the web with Markdown support. What you see is what you paste. No WYSIWIG, no formatting pasted from the web, and no features you don't need or want.

### Intuitive

Drag-and-drop notes into categories, instantly search through notes, and pin your favorites to the top.

### Available anywhere

TakeNote is made for the web, so you can use it anywhere without downloading anything.

### Beautiful

Enjoy a beautiful, clean design reminiscent of your IDE with light and dark themes.

### Sync to GitHub

In progress!

## Reviews

> _"I think the lack of extra crap is a feature."_ — Craig Lam

## Setup

### Pre-Installation

> Before working on TakeNote locally, you must create a GitHub OAuth app for development.

Go to your GitHub profile settings, and click on **Developer Settings**.

Click the **New OAuth App** button.

- **Application name**: TakeNote Development
- **Homepage URL**: `http://localhost:3000`
- **Authorization callback URL**: `http://localhost:3000/api/auth/callback`

Create a `.env` file in the root of the project, and add the app's client ID and secret.

```bash
CLIENT_ID=xxx
CLIENT_SECRET=xxxx
```

> Change the URLs to port `5000` in production mode or Docker.

### Install

```bash
git clone git@github.com:taniarascia/takenote
cd takenote
npm i
```

### Development

In the development environment, an Express server is running on port `5000` to handle all API calls, and a hot Webpack dev server is running on port `3000` for the React front end. To run both of these servers concurrently, run the `dev` command.

```bash
npm run dev
```

Go to `localhost:3000` to view the app.

API requests will be proxied to port `5000` automatically.

### Production

In production, the React app is built, and Express redirects all incoming requests to the `dist` directory on port `5000`.

```bash
npm run build && npm run start
```

Go to `localhost:5000` to view the app.

### Run in Docker

Follow these instructions to build an image and run a container.

```bash
# Build Docker image
docker build --build-arg CLIENT_ID=xxx -t takenote:mytag .

# Run Docker container in port 5000
docker run \
-e CLIENT_ID=xxx \
-e CLIENT_SECRET=xxxx \
-e NODE_ENV=development \
-p 5000:5000 \
takenote:mytag
```

Go to `localhost:5000` to view the app.

> Note: You will see some errors during the installation phase, but these are simply warnings that unnecessary packages do not exist, since the Node Alpine base image is minimal.

### Seed data

To seed the app with some test data, paste the contents of `seed.js` into your browser console.

## Testing

Run unit and component/integration tests.

```bash
npm run test
```

> If using Jest Runner in VSCode, put "jestrunner.configPath": "config/jest.config.js" in your settings

Run Cypress end-to-end tests.

```bash
# In one window, run the application in test mode
npm run dev:test

# In another window, run the end-to-end tests
npm run test:e2e:open
```

## Folder Structure

Explanation the structure of files and directories within TakeNote.

```bash
├── config/                    # Configuration
│   ├── cypress.config.js      # Cypress end-to-end test configuration
│   ├── jest.config.js         # Jest unit/component test configuration
│   ├── nodemon.config.json    # Nodemon configuration
│   ├── webpack.common.js      # Webpack shared configuration
│   ├── webpack.dev.js         # Webpack development configuration (dev server)
│   └── webpack.prod.js        # Webpack productuon configuration (dist output)
├── assets/                    # Supplemental assets
├── patches/                   # Overrides for dependencies
├── public/                    # Files that will write to dist on build
├── src/                       # All TakeNote app source files
│   ├── resources/             # Shared resources
│   ├── client/                # React client side code
│   │   ├── api/               # Temporary placeholders for mock API calls
│   │   ├── components/        # React components that are not connected to Redux
│   │   ├── contexts/          # React context global state without Redux
│   │   ├── router/            # React private and public routes
│   │   ├── sagas/             # Redux sagas
│   │   ├── selectors/         # Redux Toolkit selectors
│   │   ├── slices/            # Redux Toolkit slices
│   │   ├── styles/            # Sass style files
│   │   ├── types/             # TypeScript types
│   │   ├── utils/             # Utility functions
│   │   └── index.tsx          # Client side entry point
│   └── server/                # Node/Express server side code
│       ├── handlers/          # Functions for API endpoints
│       ├── middleware/        # Middleware for API endpoints
│       ├── router/            # Route API endpoints
│       ├── utils/             # Backend utilities
│       └── index.ts           # Server entrypoint
├── tests/                     # Test suites
│   ├── e2e/                   # Cypress end-to-end tests
│   └── unit/                  # React Testing Library and Jest tests
├── .dockerignore              # Files ignored by Docker
├── .editorconfig              # Configures editor rules
├── .gitignore                 # Files ignored by git
├── .prettierrc                # Code convention enforced by Prettier
├── .travis.yml                # Continuous integration and deployment config
├── CHANGELOG.md               # List of significant changes
├── deploy.sh                  # Deployment script for Docker in production
├── Dockerfile                 # Docker build instructions
├── LICENSE                    # License for this open source project
├── package-lock.json          # Package lockfile
├── package.json               # Dependencies and additional information
├── README.md
├── seed.js                    # Seed the app with data for testing
└── tsconfig.json              # Typescript configuration
```

## Scripts

An explanation of the `package.json` scripts.

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `dev`           | Run TakeNote in a development environment    |
| `dev:test`      | Run TakeNote in a testing environment        |
| `client`        | Start a webpack dev server for the front end |
| `server`        | Start a nodemon dev server for the back end  |
| `build`         | Create a production build of TakeNote        |
| `start`         | Start a production server for TakeNote       |
| `test`          | Run unit and component tests                 |
| `test:e2e`      | Run end-to-end tests in the command line     |
| `test:e2e:open` | Open end-to-end tests in a browser           |
| `test:coverage` | Get test coverage                            |
| `postinstall`   | Apply patches                                |

## Technologies

TakeNote is possible thanks the all these open source languages, libraries, and frameworks.

| Tech                                          | Description                               |
| --------------------------------------------- | ----------------------------------------- |
| [Codemirror](https://codemirror.net/)         | Browser-based text editor                 |
| [TypeScript](https://www.typescriptlang.org/) | Static type-checking programming language |
| [Node.js](https://nodejs.org/en/)             | JavaScript runtime for the backend        |
| [Express](https://expressjs.com/)             | Server framework                          |
| [React](https://reactjs.org/)                 | Front end user interface                  |
| [Redux](https://redux.js.org/)                | Global state management                   |
| [Webpack](https://webpack.js.org/)            | Asset bundler                             |
| [Sass](https://sass-lang.com/)                | Style preprocessor                        |
| [OAuth](https://oauth.net/)                   | Protocol for secure authorization         |
| [ESLint](https://eslint.org/)                 | TypeScript linting                        |
| [Jest](https://jestjs.io/)                    | Unit testing framework                    |
| [Cypress](https://www.cypress.io/)            | End-to-end testing framework              | L |

## Contributing

TakeNote is an open source project, and contributions of any kind are welcome! Open issues, bugs, and enhancements are all listed on the [issues](https://github.com/taniarascia/takenote/issues) tab and labeled accordingly. Feel free to open bug tickets and make feature requests. Easy bugs and features will be tagged with the `good first issue` label.

The project is written in TypeScript, React and Redux. TypeScript is set to strict mode, with no implicit any allowed. The formatting style for the project is set by Prettier.

### Style notes

- [Use non-default exports](https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/) for components
- Imports are ordered and separated by built-in modules -> external modules -> internal modules -> css/assets/other

## Contributors

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.taniarascia.com"><img src="https://avatars3.githubusercontent.com/u/11951801?v=4" width="50px;" alt=""/><br /><sub><b>Tania Rascia</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=taniarascia" title="Code">💻</a> <a href="#ideas-taniarascia" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/taniarascia/takenote/issues?q=author%3Ataniarascia" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/hankolsen"><img src="https://avatars3.githubusercontent.com/u/1008390?v=4" width="50px;" alt=""/><br /><sub><b>hankolsen</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=hankolsen" title="Code">💻</a> <a href="https://github.com/taniarascia/takenote/issues?q=author%3Ahankolsen" title="Bug reports">🐛</a> <a href="https://github.com/taniarascia/takenote/commits?author=hankolsen" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/joseph-perez"><img src="https://avatars0.githubusercontent.com/u/7772649?v=4" width="50px;" alt=""/><br /><sub><b>Joseph Perez</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=joseph-perez" title="Code">💻</a></td>
    <td align="center"><a href="https://cutting.scot"><img src="https://avatars0.githubusercontent.com/u/118328?v=4" width="50px;" alt=""/><br /><sub><b>Paul</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=dagda1" title="Code">💻</a> <a href="https://github.com/taniarascia/takenote/commits?author=dagda1" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://martinbrosenberg.com/"><img src="https://avatars2.githubusercontent.com/u/2382147?v=4" width="50px;" alt=""/><br /><sub><b>Martin Rosenberg</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=MartinRosenberg" title="Code">💻</a> <a href="https://github.com/taniarascia/takenote/issues?q=author%3AMartinRosenberg" title="Bug reports">🐛</a> <a href="#maintenance-MartinRosenberg" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://codepen.io/meowwwls"><img src="https://avatars3.githubusercontent.com/u/16426195?v=4" width="50px;" alt=""/><br /><sub><b>Melissa</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=meowwwls" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jjtowle"><img src="https://avatars0.githubusercontent.com/u/41359068?v=4" width="50px;" alt=""/><br /><sub><b>Jason Towle</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=jjtowle" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://blog.isquaredsoftware.com"><img src="https://avatars1.githubusercontent.com/u/1128784?v=4" width="50px;" alt=""/><br /><sub><b>Mark Erikson</b></sub></a><br /><a href="#ideas-markerikson" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://www.alphonsebouy.fr"><img src="https://avatars2.githubusercontent.com/u/32797759?v=4" width="50px;" alt=""/><br /><sub><b>Alphonse Bouy</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/issues?q=author%3Aalphonseb" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/dave2kb"><img src="https://avatars1.githubusercontent.com/u/30696030?v=4" width="50px;" alt=""/><br /><sub><b>dave2kb</b></sub></a><br /><a href="#design-dave2kb" title="Design">🎨</a> <a href="#ideas-dave2kb" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/Dantaro"><img src="https://avatars3.githubusercontent.com/u/2750903?v=4" width="50px;" alt=""/><br /><sub><b>Devin McIntyre</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=Dantaro" title="Code">💻</a></td>
    <td align="center"><a href="http://slofish.io"><img src="https://avatars0.githubusercontent.com/u/1240484?v=4" width="50px;" alt=""/><br /><sub><b>Jeffrey Fisher</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/issues?q=author%3Ajeffslofish" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/dong-alex"><img src="https://avatars2.githubusercontent.com/u/23242741?v=4" width="50px;" alt=""/><br /><sub><b>Alex Dong</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=dong-alex" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Publicker"><img src="https://avatars2.githubusercontent.com/u/52673485?v=4" width="50px;" alt=""/><br /><sub><b>Publicker</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=Publicker" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/kleyu"><img src="https://avatars2.githubusercontent.com/u/36169811?v=4" width="50px;" alt=""/><br /><sub><b>Jakub Naskręski</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=kleyu" title="Code">💻</a> <a href="https://github.com/taniarascia/takenote/issues?q=author%3Akleyu" title="Bug reports">🐛</a> <a href="https://github.com/taniarascia/takenote/commits?author=kleyu" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://opw0011.github.io/"><img src="https://avatars2.githubusercontent.com/u/10897048?v=4" width="50px;" alt=""/><br /><sub><b>Benny O</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=opw0011" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/justDOindev"><img src="https://avatars3.githubusercontent.com/u/44042682?v=4" width="50px;" alt=""/><br /><sub><b>Justin Payne</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=justDOindev" title="Code">💻</a></td>
    <td align="center"><a href="https://yikjin.github.io"><img src="https://avatars2.githubusercontent.com/u/34995304?v=4" width="50px;" alt=""/><br /><sub><b>marshmallow</b></sub></a><br /><a href="#maintenance-yikjin" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://jfelix.info"><img src="https://avatars2.githubusercontent.com/u/21092519?v=4" width="50px;" alt=""/><br /><sub><b>Jose Felix </b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=Jfelix61" title="Code">💻</a></td>
    <td align="center"><a href="https://xboston.dev"><img src="https://avatars1.githubusercontent.com/u/201306?v=4" width="50px;" alt=""/><br /><sub><b>Nikolay Kirsh</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=xboston" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Mudassar045"><img src="https://avatars0.githubusercontent.com/u/24487349?v=4" width="50px;" alt=""/><br /><sub><b>Mudassar Ali</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=Mudassar045" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://nathanbland.github.io/"><img src="https://avatars1.githubusercontent.com/u/926111?v=4" width="50px;" alt=""/><br /><sub><b>Nathan Bland</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/issues?q=author%3ANathanBland" title="Bug reports">🐛</a> <a href="https://github.com/taniarascia/takenote/commits?author=NathanBland" title="Code">💻</a></td>
    <td align="center"><a href="http://craiglam.com"><img src="https://avatars1.githubusercontent.com/u/8170456?v=4" width="50px;" alt=""/><br /><sub><b>Craig Lam</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=siliconeidolon" title="Code">💻</a> <a href="https://github.com/taniarascia/takenote/issues?q=author%3Asiliconeidolon" title="Bug reports">🐛</a> <a href="https://github.com/taniarascia/takenote/commits?author=siliconeidolon" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://twitter.com/ashinzekene"><img src="https://avatars2.githubusercontent.com/u/20991583?v=4" width="50px;" alt=""/><br /><sub><b>Ashinze Ekene</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/issues?q=author%3Aashinzekene" title="Bug reports">🐛</a> <a href="https://github.com/taniarascia/takenote/commits?author=ashinzekene" title="Code">💻</a></td>
    <td align="center"><a href="https://adityasriram.ga"><img src="https://avatars0.githubusercontent.com/u/38230536?v=4" width="50px;" alt=""/><br /><sub><b>Harry Sullivan</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=harrySullivan" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/moudev"><img src="https://avatars2.githubusercontent.com/u/13499566?v=4" width="50px;" alt=""/><br /><sub><b>Mauricio Martínez</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=moudev" title="Code">💻</a></td>
    <td align="center"><a href="http://www.bugs.cc/"><img src="https://avatars0.githubusercontent.com/u/8198408?v=4" width="50px;" alt=""/><br /><sub><b>Black-Hole</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=BlackHole1" title="Code">💻</a></td>
    <td align="center"><a href="https://zogan.de/"><img src="https://avatars0.githubusercontent.com/u/122564?v=4" width="50px;" alt=""/><br /><sub><b>Frank Blendinger</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=yogan" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.osiux.ws"><img src="https://avatars2.githubusercontent.com/u/204463?v=4" width="50px;" alt=""/><br /><sub><b>Eduardo Reveles</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=osiux" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/leofrozenyogurt"><img src="https://avatars2.githubusercontent.com/u/2198384?v=4" width="50px;" alt=""/><br /><sub><b>Leo Royzengurt</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=leofrozenyogurt" title="Code">💻</a> <a href="https://github.com/taniarascia/takenote/issues?q=author%3Aleofrozenyogurt" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/kcvgan"><img src="https://avatars1.githubusercontent.com/u/13578888?v=4" width="50px;" alt=""/><br /><sub><b>kcvgan</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=kcvgan" title="Code">💻</a> <a href="https://github.com/taniarascia/takenote/issues?q=author%3Akcvgan" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/codytowstik"><img src="https://avatars1.githubusercontent.com/u/10625608?v=4" width="50px;" alt=""/><br /><sub><b>Cody Towstik</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=codytowstik" title="Code">💻</a> <a href="https://github.com/taniarascia/takenote/commits?author=codytowstik" title="Tests">⚠️</a> <a href="https://github.com/taniarascia/takenote/issues?q=author%3Acodytowstik" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/vincentdoerig"><img src="https://avatars3.githubusercontent.com/u/24668338?v=4" width="50px;" alt=""/><br /><sub><b>Vincent Dörig</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=vincentdoerig" title="Tests">⚠️</a> <a href="https://github.com/taniarascia/takenote/commits?author=vincentdoerig" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/miqh"><img src="https://avatars3.githubusercontent.com/u/43751307?v=4" width="50px;" alt=""/><br /><sub><b>Michael Huynh</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=miqh" title="Code">💻</a> <a href="https://github.com/taniarascia/takenote/issues?q=author%3Amiqh" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/code128"><img src="https://avatars0.githubusercontent.com/u/43435?v=4" width="50px;" alt=""/><br /><sub><b>Joshua Bloom</b></sub></a><br /><a href="https://github.com/taniarascia/takenote/commits?author=code128" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Acknowledgements

- A big thank you to [David Bock](https://dkbock.com/) for logo design.

## Author

- [Tania Rascia](https://www.taniarascia.com)

## License

This project is open source and available under the [MIT License](LICENSE).
