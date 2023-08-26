import React from 'react';

import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoute = (props:{token:string}) => {
  const useAuth = () => {
    const user = localStorage.getItem('token')
    if (user) {
      return true
    } else {
      return false
    }
  }

  const { token } = props

  const auth = useAuth()

  if (!auth) {
    return <Outlet />
  } else {
    return <Navigate to="/login" />
  }
}

export default ProtectedRoute;