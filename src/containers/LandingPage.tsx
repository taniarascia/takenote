import React from 'react'

import { useAuth0 } from 'auth'

const LandingPage: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <>
      <div>Hello!</div>
      <div>
        {!isAuthenticated && <button onClick={() => loginWithRedirect({})}>Log in</button>}
        {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
      </div>
    </>
  )
}

export default LandingPage
