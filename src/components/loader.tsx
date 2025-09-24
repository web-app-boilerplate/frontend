// components/Loader.jsx
import { Loader2 } from 'lucide-react' // shadcn uses lucide icons
import { cn } from '../utils/cn' // optional helper to merge classNames

const Loader = ({ size = 'w-12 h-12', color = 'text-blue-500', className }) => {
  return (
    <div className={cn('flex justify-center items-center', className)}>
      <Loader2 className={`${size} ${color} animate-spin`} />
    </div>
  )
}

export default Loader
