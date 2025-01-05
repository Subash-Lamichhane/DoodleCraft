import { Palette } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-scroll';

export default function Header() {
  return (
    <header className="border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <RouterLink to="/" className="flex items-center space-x-2">
          <Palette className="w-8 h-8 text-purple-500" />
          <span className="text-xl font-bold">DoodleCraft</span>
        </RouterLink>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link to="features"                 
                smooth={true}
                duration={500}
                offset={-50}
              className="hover:text-purple-400 transition-colors cursor-pointer">
                Features
              </Link>
            </li>
            <li>
              <Link
                to="how-it-works"
                smooth={true}
                duration={500}
                offset={-50} 
                className="hover:text-purple-400 transition-colors cursor-pointer"
              >
                How It Works
              </Link>
            </li>
            <Link to="team-members"                 
                smooth={true}
                duration={500}
                offset={-50} 
              className="hover:text-purple-400 transition-colors cursor-pointer">
                Team Members
              </Link>
              <li>
            <RouterLink
                to="/task-completed"
                className="hover:text-purple-400 transition-colors cursor-pointer"
              >
                Task Completed
              </RouterLink>
              </li>
            <li>
              
              <RouterLink
                to="/sketch"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Try Now
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
