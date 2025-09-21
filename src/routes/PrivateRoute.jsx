import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import logger from '../utils/logger'

const PrivateRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext)

  if (!user) return <Navigate to='/login' />
  if (roles && !roles.includes(user.role)) return <Navigate to='/' />

  return children
}

export default PrivateRoute
