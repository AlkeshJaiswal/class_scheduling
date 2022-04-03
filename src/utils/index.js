import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// eslint-disable-next-line react/prop-types
export function PrivateRoute({ children }) {
  const auth = useSelector((state) => state.isAuthenticated)

  if (!auth) {
    return <Navigate to="/login" replace />
  }

  return children
}
