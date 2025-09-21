import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getAllUsers } from '../api/user'
import logger from '../utils/logger'

const AdminDashboard = () => {
  const { token } = useContext(AuthContext)
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
      const data = await getAllUsers(token, page, limit) // make sure API accepts page & limit
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

  if (loading) return <p>Loading users...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
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
  )
}

export default AdminDashboard
