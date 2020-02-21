import React from 'react'

import lightScreen from '@/assets/light.png'
import darkScreen from '@/assets/dark.png'
import squareLogo from '@/assets/logo-white-square.svg'
import icon from '@/assets/logo-square-color.svg'
import githubLogo from '@/assets/github-logo.png'

const clientId = process.env.CLIENT_ID

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
      <nav className="navigation">
        <div className="container">
          <div className="brand">
            <img src={icon} alt="TakeNote App" className="brand-icon" />
            <span>TakeNote</span>
          </div>
          <div className="menu">
            <a href="https://github.com/taniarascia/takenote">Source</a>
            {loginButton('Sign In')}
          </div>
        </div>
      </nav>

      <section className="content">
        <div className="container-small">
          <div className="lead">
            <h1>
              The Note Taking App
              <br /> for Developers
            </h1>
            <p className="subtitle">
              A free, open-source notes app for the web. All the features you need without all the
              fluff.
            </p>
            <p className="cta">{loginButton('Sign Up with GitHub')}</p>
          </div>
        </div>
        <div className="container">
          <img src={lightScreen} alt="TakeNote App" className="screenshot" />
        </div>
      </section>

      <section className="content">
        <div className="container">
          <div className="features">
            <div>
              <h2>Fast and simple</h2>
              <p>
                {`What you paste is what you see. No WYSIWIG, no formatting applied from the web, and no
              features you don't need or want.`}
              </p>
            </div>
            <div>
              <h2>Intuitive</h2>
              <p>
                Drag-and-drop notes into categories, instantly search through notes, and pin your
                favorites to the top.
              </p>
            </div>
            <div>
              <h2>Available anywhere</h2>
              <p>
                TakeNote is made for the web, so you can use it anywhere without downloading
                anything.
              </p>
            </div>
            <div>
              <h2>Beautiful</h2>
              <p>
                Enjoy a beautiful, clean design reminiscent of your IDE with light and dark themes.
              </p>
            </div>
          </div>
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
