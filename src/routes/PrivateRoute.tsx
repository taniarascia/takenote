import React, { useEffect, Component } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'

import { useAuth0 } from 'auth'

interface IPrivateRouteOptions {
  component: React.FC
  path: string
}

type PrivateRouteOptions = IPrivateRouteOptions

const PrivateRoute = ({ component, path, ...rest }: PrivateRouteOptions) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect(() => {
    const fn = async () => {
      if (loading || !loginWithRedirect) {
        return
      }

      if (!isAuthenticated) {
        await loginWithRedirect({
          redirect_uri: '',
          appState: { targetUrl: path },
        })
      }
    }
    fn()
  }, [isAuthenticated, loading, loginWithRedirect, path])

  const render = (props: RouteComponentProps<{}>) => <Component {...props} />

  return <Route exact path={path} render={render} component={component} {...rest} />
}

export default PrivateRoute
