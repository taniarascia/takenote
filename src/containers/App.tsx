import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { useAuth0 } from 'auth'
import PrivateRoute from 'routes/PrivateRoute'
import LandingPage from 'containers/LandingPage'
import TakeNoteApp from 'containers/TakeNoteApp'

const App: React.FC = () => {
  const { loading } = useAuth0()

  if (loading) {
    return (
      <div className="loading">
        <div className="la-ball-beat">
          <div />
          <div />
          <div />
        </div>
      </div>
    )
  }

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TakeNote</title>
        <link rel="canonical" href="https://takenote.dev" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <PrivateRoute path="/app" component={TakeNoteApp} />
      </Switch>
    </HelmetProvider>
  )
}

export default App
