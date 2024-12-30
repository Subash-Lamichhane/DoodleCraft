import { Palette } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Palette className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold">DoodleCraft</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
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

