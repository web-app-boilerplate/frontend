import { Menu } from '../components/menu'
import { RegisterForm } from '../components/register-form'

const RegisterPage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Menu />
      <main className='flex-grow container mx-auto px-6 flex flex-col items-center justify-center text-center'>
        <div className='w-full max-w-sm'>
          <RegisterForm />
        </div>
      </main>
    </div>
  )
}

export default RegisterPage
