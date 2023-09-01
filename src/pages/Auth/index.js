import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

export default function Index() {
    return (
        <main id='mainAuth'>
            <Routes>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Routes>
        </main>
    )
}
