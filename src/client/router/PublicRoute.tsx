import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { getAuth } from '@/selectors'

interface PublicRouteProps extends RouteProps {
  component: any
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(getAuth)

  return (
    <Route
      render={props =>
        isAuthenticated === false ? <Component {...props} /> : <Redirect to="/app" />
      }
      {...rest}
    />
  )
}
