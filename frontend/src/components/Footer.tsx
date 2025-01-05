import { Palette } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Palette className="w-8 h-8 text-purple-500" />
            <Link to="/" className="text-xl font-bold">DoodleCraft</Link>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/task-completed" className="hover:text-purple-400 transition-colors">Task Completed</Link></li>
              <li><Link to="/sketch" className="hover:text-purple-400 transition-colors">Try Now</Link></li>
              <li><Link to="#" className="hover:text-purple-400 transition-colors">Contact</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 text-center text-gray-400">
          © {new Date().getFullYear()} DoodleCraft. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

