import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  // Load saved user/token from localStorage on mount
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'))
    const savedToken = localStorage.getItem('token')
    const savedRefreshToken = localStorage.getItem('refreshToken')

    if (savedUser && savedToken) {
      setUser(savedUser)
      setToken(savedToken)
    }

    // Optionally, you could validate token here
  }, [])

  // Axios instance
  const api = axios.create({ baseURL: '/api' })

  // Attach token to all requests
  api.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  // Refresh token on 401
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          logoutUser()
          return Promise.reject(error)
        }

        try {
          // Call refresh token endpoint
          const res = await axios.post('/api/auth/refresh-token', {
            token: refreshToken,
          })
          const newToken = res.data.accessToken

          // Update token in state and localStorage
          setToken(newToken)
          localStorage.setItem('token', newToken)

          // Retry the original request with new token
          error.config.headers.Authorization = `Bearer ${newToken}`
          return axios(error.config)
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
    <AuthContext.Provider value={{ user, token, api, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}
