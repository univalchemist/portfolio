import React, { useContext } from 'react'
import { useLocation, Navigate, Location, Outlet } from 'react-router-dom'

import { signInPath } from '@utils/index'
import { AppContext } from '@root/AppContext'

const AuthWrapper: React.FC = () => {
  const { authenticated } = useContext(AppContext)
  const location: Location = useLocation()

  if (!authenticated) {
    return <Navigate to={signInPath} state={{ from: location }} replace />
  }

  return <Outlet />
}

export default AuthWrapper
