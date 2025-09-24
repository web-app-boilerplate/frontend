import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getAllUsers } from '../api/user'
import logger from '../utils/logger'
import { Menu } from '../components/menu'

const AdminDashboard = () => {
  const { isReady } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalUsers: 0,
    totalPages: 1,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      setLoading(true)
      const data = await getAllUsers(page, limit) // make sure API accepts page & limit
      setUsers(data.users || [])
      setPagination(data.pagination || {})
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(pagination.page, pagination.limit)
  }, [])

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  // Wait until AuthContext is ready before calling API
  if (!isReady) return <div>Loading...</div>
  return (
    <div className='min-h-screen flex flex-col'>
      <Menu />
      <main className='flex-grow container mx-auto px-6 flex flex-col items-center justify-center text-center'>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div>
            <h2>Admin Dashboard</h2>
            <table
              border='1'
              cellPadding='8'
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Credit</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
