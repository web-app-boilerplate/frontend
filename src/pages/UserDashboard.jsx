import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthContext'
import { getUserById, updateUser } from '../api/user'
import logger from '../utils/logger'
import { Menu } from '../components/menu'
import Loader from '../components/loader'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2Icon } from 'lucide-react'
const UserDashboard = () => {
  const { user, isReady } = useContext(AuthContext)
  const form = useForm({
    defaultValues: { name: '', email: '', credit: '', role: '' },
  })
  const [userData, setUserData] = useState(null)
  const [message, setMessage] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(user.id)
        setUserData(data)
        form.reset({
          name: data.name,
          email: data.email,
          credit: data.credit,
          role: data.role,
        })
      } catch (err) {
        logger.error('Failed to fetch user:', err)
      }
    }
    fetchUser()
  }, [user])

  const handleUpdate = async (values) => {
    setUpdating(true)
    try {
      const updated = await updateUser(user.id, values)
      setUserData(updated)
      setMessage('Profile updated successfully!')
      logger.info('User updated', updated)
    } catch (err) {
      setMessage('Update failed')
      logger.error(err)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Menu />
      <main className='flex-grow container mx-auto px-6 flex flex-col items-center justify-center text-center'>
        {!userData || !isReady ? (
          <Loader
            size='w-16 h-16'
            color='text-black-500'
          />
        ) : (
          <>
            <h2 className='text-2xl font-bold mb-4'>
              Welcome, {userData.name}
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleUpdate)}
                className='w-1/2'
              >
                <FormField
                  name='name'
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name='email'
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name='credit'
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel>Credit</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name='role'
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  disabled={updating}
                >
                  {updating ? 'Updating...' : 'Update'}
                </Button>
              </form>
            </Form>

            {message && (
              <Alert className='w-1/2 m-2 flex items-center justify-center'>
                <CheckCircle2Icon />
                <AlertTitle className='text-center text-sm'>
                  {message}
                </AlertTitle>
              </Alert>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default UserDashboard
