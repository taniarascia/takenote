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
            {isMobile && (
              <p className="p-mobile">TakeNote is not currently supported for mobile devices.</p>
            )}
            <div className="new-signup">
              {isDemo && !isMobile ? (
                <div>
                  <p>
                    TakeNote is only available as a demo. Your notes will be saved to local storage
                    and <b>not</b> persisted in any database or cloud.
                  </p>
                  <a className="button" href="/app">
                    View Demo
                  </a>
                </div>
              ) : (
                <div>
                  <p>
                    TakeNote does not have a database or users. It simply links with your GitHub
                    account for authentication, and stores the data in a private{' '}
                    <code>takenotes-data</code> repo.
                  </p>
                  <div className="cta">{loginButton('Sign Up with GitHub')}</div>
                </div>
              )}
            </div>
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
              <li>Plain text notes</li>
              <li>Markdown preview</li>
              <li>Syntax highlighting</li>
              <li>Keyboard shortcuts</li>
              <li>Drag and drop</li>
              <li>Favorites and categories</li>
              <li>Multi-note actions</li>
              <li>Multi-cursor editing</li>
              <li>Light/dark theme</li>
              <li>Search notes</li>
              <li>Prettify notes</li>
              <li>No WYSIWYG</li>
              <li>No database</li>
              <li>No tracking or analytics</li>
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
