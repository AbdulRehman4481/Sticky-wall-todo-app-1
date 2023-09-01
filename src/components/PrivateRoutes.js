import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext, useAuthContext } from 'context/AuthContext'

export default function PrivateRoute({ Component }) {
    const { isAuth } = useContext(AuthContext)
    const location = useLocation()

    if (!isAuth)
        return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />

    return (
        <Component />
    )
}
