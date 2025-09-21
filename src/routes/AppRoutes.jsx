import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminDashboard from '../pages/AdminDashboard'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import UserDashboard from '../pages/UserDashboard'
import PrivateRoute from './PrivateRoute'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<LandingPage />}
        />
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/register'
          element={<RegisterPage />}
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute roles={['user', 'admin']}>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin-dashboard'
          element={
            <PrivateRoute roles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes
