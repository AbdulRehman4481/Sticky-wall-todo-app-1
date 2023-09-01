import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Frontend from "./Frontend"
import Auth from "./Auth"
import { AuthContext } from 'context/AuthContext'
import PrivateRoute from 'components/PrivateRoutes'

export default function Index() {
  const { isAuth } = useContext(AuthContext)
  return (
    <>
      <Routes>
        <Route path='/*' element={<PrivateRoute Component={Frontend} />} />
        <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}
