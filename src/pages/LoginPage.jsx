import { LoginForm } from '../components/login-form'
import { Menu } from '../components/menu'

const LoginPage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Menu />
      <main className='flex-grow container mx-auto px-6 flex flex-col items-center justify-center text-center'>
        <div className='w-full max-w-sm'>
          <LoginForm />
        </div>
      </main>
    </div>
  )
}

export default LoginPage
