import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  const { user, logoutUser } = useContext(AuthContext)

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Web App</h1>
      {!user ? (
        <>
          <Link to='/login'>
            <button>Login</button>
          </Link>
          <Link to='/register'>
            <button>Register</button>
          </Link>
        </>
      ) : (
        <>
          <p>Logged in as: {user.role}</p>
          {user.role && user.role == 'admin' && (
            <Link to='/admin-dashboard'>
              <button>Go to Admin Dashboard</button>
            </Link>
          )}
          <Link to='/dashboard'>
            <button>Go to Dashboard</button>
          </Link>
          <button onClick={logoutUser}>Logout</button>
        </>
      )}
    </div>
  )
}

export default LandingPage
