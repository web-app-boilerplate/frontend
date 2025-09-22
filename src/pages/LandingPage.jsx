import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Menu } from '../components/menu'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className='min-h-screen flex flex-col'>
      <Menu />

      <main className='flex-grow container mx-auto px-6 flex flex-col items-center justify-center text-center'>
        <h1 className='text-4xl font-bold mb-4'>Welcome to Web App</h1>
        {user ? (
          <p className='text-lg'>Logged in as: {user.role}</p>
        ) : (
          <>
            <p className='text-lg'>
              Please{' '}
              <Link
                to='/login'
                className='ml-auto inline-block underline-offset-4 hover:underline'
              >
                log in
              </Link>{' '}
              or{' '}
              <Link
                to='/register'
                className='ml-auto inline-block underline-offset-4 hover:underline'
              >
                sign up
              </Link>{' '}
              to continue.
            </p>
          </>
        )}
      </main>
    </div>
  )
}

export default LandingPage
