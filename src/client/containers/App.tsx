import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { LandingPage } from '@/containers/LandingPage'
import { TakeNoteApp } from '@/containers/TakeNoteApp'
import { PrivateRoute } from '@/router/PrivateRoute'

export const App: React.FC = () => {
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
        <Redirect to="/" />
      </Switch>
    </HelmetProvider>
  )
}
