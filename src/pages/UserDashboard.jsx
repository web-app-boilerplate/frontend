import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getUserById, updateUser } from '../api/user'
import logger from '../utils/logger'

const UserDashboard = () => {
  const { user, token } = useContext(AuthContext)
  const [userData, setUserData] = useState(null)
  const [editName, setEditName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(user.id, token)
        setUserData(data)
        setEditName(data.name)
      } catch (err) {
        logger.error('Failed to fetch user:', err)
      }
    }
    fetchUser()
  }, [user, token])

  const handleUpdate = async () => {
    try {
      const updated = await updateUser(user.id, { name: editName }, token)
      setUserData(updated)
      setMessage('Profile updated successfully!')
      logger.info('User updated', updated)
    } catch (err) {
      setMessage('Update failed')
      logger.error(err)
    }
  }

  if (!userData) return <p>Loading...</p>

  return (
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
  )
}

export default UserDashboard
