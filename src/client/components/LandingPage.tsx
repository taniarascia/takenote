import React from 'react'
import { isMobile } from 'react-device-detect'

import lightScreen from '@resources/assets/screenshot-light.png'
import darkScreen from '@resources/assets/screenshot-dark.png'
import squareLogo from '@resources/assets/logo-square-white.svg'
import logo from '@resources/assets/logo-square-color.svg'
import githubLogo from '@resources/assets/github-logo.png'

const clientId = process.env.CLIENT_ID
const isDemo = process.env.DEMO

const loginButton = (text: string) => (
  <a
    className="button github-button"
    href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`}
  >
    <img src={githubLogo} />
    {text}
  </a>
)

export const LandingPage: React.FC = () => {
  return (
    <section className="landing-page">
      <section className="content">
        <div className="container-small">
          <div className="lead">
            <img src={logo} height="200" width="200" alt="TakeNote" />
            <h1>
              The Note Taking App
              <br /> for Developers
            </h1>
            <p className="subtitle">A free, open-source notes app for the web.</p>
            {isMobile ? (
              <p className="p-mobile">
                TakeNote is not currently supported for tablet and mobile devices.
              </p>
            ) : isDemo ? (
              <div className="new-signup">
                <div>
                  <p>
                    TakeNote is only available as a demo. Your notes will be saved to local storage
                    and <b>not</b> persisted in any database or cloud.
                  </p>
                  <a className="button" href="/app">
                    View Demo
                  </a>
                </div>
              </div>
            ) : (
              <div className="new-signup">
                <div>
                  <p>
                    TakeNote does not have a database or users. It simply links with your GitHub
                    account for authentication, and stores the data in a private{' '}
                    <code>takenotes-data</code> repo.
                  </p>
                  <div className="cta">{loginButton('Sign Up with GitHub')}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="container">
          <img src={lightScreen} alt="TakeNote App" className="screenshot" />
        </div>
      </section>

      <section className="content">
        <div className="container-small">
          <div className="features">
            <h2 className="text-center">Features</h2>
            <ul>
              <li>
                <strong>Plain text notes</strong> - take notes in an IDE-like environment that makes
                no assumptions
              </li>
              <li>
                <strong>Markdown preview</strong> - view rendered HTML
              </li>
              <li>
                <strong>Linked notes</strong> - use <code>{`{{uuid}}`}</code> syntax to link to
                notes within other notes
              </li>
              <li>
                <strong>Syntax highlighting</strong> - light and dark mode available (based on the
                beautiful <a href="https://taniarascia.github.io/new-moon/">New Moon theme</a>)
              </li>
              <li>
                <strong>Keyboard shortcuts</strong> - use the keyboard for all common tasks -
                creating notes and categories, toggling settings, and other options
              </li>
              <li>
                <strong>Drag and drop</strong> - drag a note or multiple notes to categories,
                favorites, or trash
              </li>
              <li>
                <strong>Multi-cursor editing</strong> - supports multiple cursors and other{' '}
                <a href="https://codemirror.net/">Codemirror</a> options
              </li>
              <li>
                <strong>Search notes</strong> - easily search all notes, or notes within a category
              </li>
              <li>
                <strong>Prettify notes</strong> - use Prettier on the fly for your Markdown
              </li>
              <li>
                <strong>No WYSIWYG</strong> - made for developers, by developers
              </li>
              <li>
                <strong>No database</strong> - notes are only stored in the browser&#39;s local
                storage and are available for download and export to you alone
              </li>
              <li>
                <strong>No tracking or analytics</strong> - &#39;nuff said
              </li>
              <li>
                <strong>GitHub integration</strong> - self-hosted option is available for
                auto-syncing to a GitHub repository (not available in the demo)
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          <img src={darkScreen} alt="TakeNote App" className="screenshot" />
        </div>
      </section>

      <footer className="footer">
        <div className="container-small">
          <img src={squareLogo} alt="TakeNote App" className="logo" />
          <p>
            <strong>TakeNote</strong>
          </p>
          <nav>
            <a
              href="https://github.com/taniarascia/takenote"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
            <a
              href="https://github.com/taniarascia/takenote/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Issues
            </a>
            <a
              href="https://github.com/taniarascia/takenote/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contributors
            </a>
          </nav>
        </div>
      </footer>
    </section>
  )
}
