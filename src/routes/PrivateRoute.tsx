import React, { useEffect } from 'react'
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom'

import { useAuth0 } from 'auth'

interface PrivateRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ElementType
  path: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if (loading || isAuthenticated) {
      return
    }

    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path },
      })
    }

    fn()
  }, [isAuthenticated, loading, loginWithRedirect, path])

  const render = (props: RouteComponentProps<{}>) =>
    isAuthenticated === true ? <Component {...props} /> : null

  return <Route path={path} render={render} {...rest} />
}

export default PrivateRoute
