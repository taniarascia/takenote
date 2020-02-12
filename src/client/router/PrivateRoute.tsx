import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { getAuth } from '@/selectors'

interface PrivateRouteProps extends RouteProps {
  component: any
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(getAuth)

  return (
    <Route
      render={props => (isAuthenticated === true ? <Component {...props} /> : <Redirect to="/" />)}
      {...rest}
    />
  )
}
