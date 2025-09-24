import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import api from '../api/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage immediately
  const savedUser = JSON.parse(localStorage.getItem('user'))
  const savedToken = localStorage.getItem('token')

  const [user, setUser] = useState(savedUser)
  const [token, setToken] = useState(savedToken)
  const [isReady, setIsReady] = useState(false) // flag to indicate context ready

  // Mark context ready after initialization
  useEffect(() => {
    setIsReady(true)
  }, [])

  // Attach token to all requests
  api.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  // Refresh token on 401
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      // Prevent retrying the refresh endpoint itself
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== '/auth/refresh-token'
      ) {
        originalRequest._retry = true // mark as retried

        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          logoutUser()
          return Promise.reject(error)
        }

        try {
          // Call refresh token endpoint
          const res = await api.post('/auth/refresh-token', { refreshToken })
          const { accessToken: newToken, refreshToken: newRefresh } = res.data

          // Update token in state and localStorage
          setToken(newToken)
          localStorage.setItem('token', newToken)
          if (newRefresh) localStorage.setItem('refreshToken', newRefresh)

          // Retry the original request with new token
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          return axios(originalRequest)
        } catch (err) {
          logoutUser()
          return Promise.reject(err)
        }
      }

      return Promise.reject(error)
    }
  )

  // Log in user
  const loginUser = (userData, token, refreshToken) => {
    setUser(userData)
    setToken(token)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
  }

  // Log out user
  const logoutUser = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }

  return (
    <AuthContext.Provider
      value={{ user, token, api, isReady, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
