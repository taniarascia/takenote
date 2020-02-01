import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { RootState } from '@/types'

interface PrivateRouteProps extends RouteProps {
  component: any
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.authState)

  return (
    <Route
      render={props => (isAuthenticated === true ? <Component {...props} /> : <Redirect to="/" />)}
      {...rest}
    />
  )
}

export default PrivateRoute
