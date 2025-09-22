import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/auth'
import { AuthContext } from '../context/AuthContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
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
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card>
        <CardHeader className='text-center'>
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>
            Fill the information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='name'>name</Label>
                <Input
                  id='name'
                  type='name'
                  placeholder='Full Name'
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Button
                  type='submit'
                  className='w-full'
                >
                  Sign up
                </Button>
                <Button
                  variant='outline'
                  className='w-full'
                >
                  Sign up with Google (coming soon)
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <Link
                to='/login'
                className='underline underline-offset-4'
              >
                Login
              </Link>
            </div>
            {error && (
              <Alert
                variant='destructive'
                className='m-2'
              >
                <AlertCircleIcon />
                <AlertTitle className='text-center text-sm'>{error}</AlertTitle>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
