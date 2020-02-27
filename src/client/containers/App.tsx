import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Redirect } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { LandingPage } from '@/containers/LandingPage'
import { TakeNoteApp } from '@/containers/TakeNoteApp'
import { PublicRoute } from '@/router/PublicRoute'
import { PrivateRoute } from '@/router/PrivateRoute'
import { getAuth } from '@/selectors'
import { login } from '@/slices/auth'

export const App: React.FC = () => {
  const { loading } = useSelector(getAuth)

  const dispatch = useDispatch()
  const _login = () => dispatch(login())

  useEffect(() => {
    _login()
  }, [])

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
        <PublicRoute exact path="/" component={LandingPage} />
        <PrivateRoute path="/app" component={TakeNoteApp} />
        <Redirect to="/" />
      </Switch>
    </HelmetProvider>
  )
}
