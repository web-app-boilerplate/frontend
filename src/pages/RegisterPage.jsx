import { useState, useContext } from 'react'
import { register } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const RegisterPage = () => {
  const { loginUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await register(form.email, form.password, form.name)
      loginUser(data.user, data.token, data.refreshToken)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Registration failed')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name='name'
          placeholder='Name'
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <input
          name='email'
          placeholder='Email'
          value={form.email}
          onChange={handleChange}
        />
        <br />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
        />
        <br />
        <button type='submit'>Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default RegisterPage
