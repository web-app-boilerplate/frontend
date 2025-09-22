import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import {
  Home,
  LayoutDashboard,
  LogIn,
  UserPlus,
  LogOut,
  CircleUser,
} from 'lucide-react'

export function Menu({ className, ...props }: React.ComponentProps<'div'>) {
  const { user, logoutUser } = useContext(AuthContext)

  return (
    <nav
      className={`w-full sticky top-0 left-0 z-50 bg-white shadow-md ${className}`}
      {...props}
    >
      <div className='container mx-auto px-6 flex justify-between items-center py-2'>
        {/* Left side (always visible) */}
        <NavigationMenu>
          <NavigationMenuList className='flex gap-6'>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to='/'
                  className='flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900'
                >
                  <Home className='h-4 w-4' />
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {user && user.role === 'admin' && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to='/admin-dashboard'
                    className='flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900'
                  >
                    <LayoutDashboard className='h-4 w-4' />
                    Admin Dashboard
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side (auth links) */}
        <NavigationMenu>
          <NavigationMenuList className='flex gap-6'>
            {!user ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to='/login'
                      className='flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900'
                    >
                      <LogIn className='h-4 w-4' />
                      Login
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to='/register'
                      className='flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900'
                    >
                      <UserPlus className='h-4 w-4' />
                      Sign Up
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to='/dashboard'
                      className='flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900'
                    >
                      <CircleUser className='h-4 w-4' />
                      Profile
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <div
                      className='cursor-pointer flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900'
                      onClick={logoutUser}
                    >
                      <LogOut className='h-4 w-4' />
                      Log Out
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
