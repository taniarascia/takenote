import React from 'react'

import lightScreen from '@resources/assets/screenshot-light.png'
import darkScreen from '@resources/assets/screenshot-dark.png'
import squareLogo from '@resources/assets/logo-square-white.svg'
import logo from '@resources/assets/logo-square-color.svg'

export const MobileMsg: React.FC = () => {
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
            <p className="subtitle-mobile">
              TakeNote is not currently supported for mobile devices.
            </p>
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
