import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { deleteUser, getAllUsers } from '../api/user'
import { Menu } from '../components/menu'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Loader from '../components/loader'
import { Trash2, CheckCircle2Icon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Alert, AlertTitle } from '@/components/ui/alert'

const AdminDashboard = () => {
  const { user, isReady } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 3,
    totalUsers: 0,
    totalPages: 1,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')

  const fetchUsers = async (page = 1, limit = 3) => {
    try {
      setLoading(true)
      const data = await getAllUsers(page, limit)
      setUsers(data.users || [])
      setPagination(data.pagination || {})
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteUserById = async (id) => {
    try {
      const data = await deleteUser(id)
      setMessage('User deleted successfully!')
    } catch (err) {
      console.error(err)
    } finally {
      fetchUsers(pagination.page, pagination.limit)
    }
  }

  useEffect(() => {
    fetchUsers(pagination.page, pagination.limit)
  }, [])

  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div className='min-h-screen flex flex-col'>
      <Menu />
      <main className='flex-grow container mx-auto px-6 flex flex-col items-center justify-center text-center'>
        {message && (
          <Alert className='w-1/2 m-2 flex items-center justify-center text-red-500'>
            <CheckCircle2Icon />
            <AlertTitle className='text-center text-sm'>{message}</AlertTitle>
          </Alert>
        )}
        {loading || !isReady ? (
          <Loader
            size='w-16 h-16'
            color='text-black-500'
          />
        ) : (
          <Table>
            <TableCaption>A list of all the users.</TableCaption>
            <TableHeader>
              <TableRow className='text-left'>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className='text-right'>Credit</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow
                  key={u.id}
                  className='text-left'
                >
                  <TableCell className='font-medium'>{u.id}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell className='text-right'>{u.credit}</TableCell>
                  {user.id !== u.id && (
                    <TableCell className='flex items-center justify-end'>
                      <AlertDialog>
                        <AlertDialogTrigger
                          asChild
                          className='cursor-pointer'
                        >
                          <Trash2 />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete <strong>{u.name}</strong>{' '}
                              account.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteUserById(u.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
