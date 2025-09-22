import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { loginUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(form.email, form.password)
      loginUser(data.user, data.token, data.refreshToken)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Login failed')
    }
  }

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card>
        <CardHeader className='text-center'>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
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
                  <a
                    href='#'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                  >
                    Forgot your password?
                  </a>
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
                  Login
                </Button>
                <Button
                  variant='outline'
                  className='w-full'
                >
                  Login with Google (coming soon)
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link
                to='/register'
                className='underline underline-offset-4'
              >
                Sign up
              </Link>
            </div>
            {error && (
              <Alert
                variant='destructive'
                className='m-2 flex items-center justify-center'
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
