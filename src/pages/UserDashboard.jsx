import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getUserById, updateUser } from '../api/user'
import logger from '../utils/logger'
import { Menu } from '../components/menu'

const UserDashboard = () => {
  const { user, isReady } = useContext(AuthContext)
  const [userData, setUserData] = useState(null)
  const [editName, setEditName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(user.id)
        setUserData(data)
        setEditName(data.name)
      } catch (err) {
        logger.error('Failed to fetch user:', err)
      }
    }
    fetchUser()
  }, [user])

  const handleUpdate = async () => {
    try {
      const updated = await updateUser(user.id, { name: editName })
      setUserData(updated)
      setMessage('Profile updated successfully!')
      logger.info('User updated', updated)
    } catch (err) {
      setMessage('Update failed')
      logger.error(err)
    }
  }

  if (!userData) return <p>Loading...</p>
  // Wait until AuthContext is ready before calling API
  if (!isReady) return <div>Loading...</div>

  return (
    <div className='min-h-screen flex flex-col'>
      <Menu />
      <main className='flex-grow container mx-auto px-6 flex flex-col items-center justify-center text-center'>
        <div style={{ padding: '2rem' }}>
          <h2>Welcome, {userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Credit: {userData.credit}</p>
          <p>Role: {userData.role}</p>
          <h3>Update Name</h3>
          <input
            type='text'
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
          {message && <p>{message}</p>}
        </div>
      </main>
    </div>
  )
}

export default UserDashboard
