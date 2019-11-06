import React from 'react'

import { useAuth0 } from 'auth'
import screenshot from 'assets/screenshot.png'
import icon from 'assets/logo-square-color.svg'

const LandingPage: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

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
              <a href="https://github.com/taniarascia/takenote">GitHub</a>
            </div>
            <div>
              {!isAuthenticated && <button onClick={() => loginWithRedirect({})}>Sign in</button>}
            </div>
          </div>
        </div>
      </div>
      <div className="app-content">
        <div className="container">
          <h1>The Note-Taking App for Developers</h1>
          <p className="subtitle">
            TakeNote is a free, open-source, plain-text note-taking app for the web. All the
            features you need, and nothing you don't.
          </p>
          <p className="cta">
            {!isAuthenticated && <button onClick={() => loginWithRedirect({})}>Sign up</button>}
            <a
              href="https://github.com/taniarascia/takenote"
              target="_blank"
              rel="noopener noreferrer"
              className="button secondary"
            >
              View Source
            </a>
          </p>
          <div>
            <img src={screenshot} alt="TakeNote App" className="app-screenshot" />
          </div>

          <div className="features">
            <div>
              <h2>Fast, clean, and simple</h2>
              <p>
                What you see is what you paste. No WYSIWIG, no formatting applied from the web, and
                no features you don't need or want.
              </p>
            </div>
            <div>
              <h2>Organized</h2>
              <p>
                Drag-and-drop notes into categories, instantly search through notes, and pin your
                favorites to the top.
              </p>
            </div>
            <div>
              <h2>Markdown support</h2>
              <p>Write in Markdown and easily toggle a live preview</p>
            </div>
            <div>
              <h2>Beautiful</h2>
              <p>
                Enjoy a beautiful, clean design reminiscent of your IDE with light and dark themes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
