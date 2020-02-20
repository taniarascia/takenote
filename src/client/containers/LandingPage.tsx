import React from 'react'

import light from '@/assets/light.png'
import dark from '@/assets/dark.png'
import icon from '@/assets/logo-square-color.svg'
import githubLogo from '@/assets/github-logo.png'

export const LandingPage: React.FC = () => {
  // Update this in development mode
  const clientId = 'a6f0527550d66198cedf'

  const loginButton = (text: string) => (
    <a
      className="button github-button"
      href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`}
    >
      <img src={githubLogo} />
      {text}
    </a>
  )

  return (
    <div className="landing-page">
      <div className="app-navigation">
        <div className="container">
          <div className="brand">
            <img src={icon} alt="TakeNote App" className="brand-icon" />
            <span>TakeNote</span>
          </div>
          <div className="menu">
            <div>
              <a href="https://github.com/taniarascia/takenote" style={{ marginRight: '1.5rem' }}>
                Source
              </a>
            </div>
            {loginButton('Sign In')}
          </div>
        </div>
      </div>
      <div className="app-content">
        <div className="container-small">
          <div className="lead">
            <h1>
              The Note Taking App
              <br /> for Developers
            </h1>
            <p className="subtitle">
              A free, open-source notes app for the web.
              <br />
              All the features you need without all the fluff.
            </p>
            <p className="cta">{loginButton('Sign Up with GitHub')}</p>
          </div>
        </div>
        <div className="container">
          <img src={light} alt="TakeNote App" className="app-screenshot" />
        </div>
      </div>
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
              TakeNote is made for the web, so you can use it anywhere without downloading anything.
            </p>
          </div>
          <div>
            <h2>Beautiful</h2>
            <p>
              Enjoy a beautiful, clean design reminiscent of your IDE with light and dark themes.
            </p>
          </div>
        </div>
        <div className="container">
          <img src={dark} alt="TakeNote App" className="app-screenshot" />
        </div>
      </div>
      <footer className="app-footer">
        <div className="container">
          <p>
            <strong style={{ marginRight: '1rem' }}>TakeNote</strong>
            <a href="https://github.com/taniarascia/takenote/">Open source</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
