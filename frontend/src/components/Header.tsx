import { Palette } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <header className="border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Palette className="w-8 h-8 text-purple-500" />
          <span className="text-xl font-bold">DoodleCraft</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="#features" className="hover:text-purple-400 transition-colors">Features</Link></li>
            <li><Link to="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</Link></li>
            <li><Link to="#" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">Try Now</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}