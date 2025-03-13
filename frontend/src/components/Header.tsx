import { Palette, Menu } from 'lucide-react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-scroll';

export default function Header({ isLanding = false }: { isLanding?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <RouterLink to="/" className="flex items-center space-x-2">
          <Palette className="w-8 h-8 text-purple-500" />
          <span className="text-xl font-bold">DoodleCraft</span>
        </RouterLink>
        <button
          className="md:hidden text-purple-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <nav
          className={`${isMenuOpen ? 'block' : 'hidden'
            } absolute top-16 left-0 w-full bg-black pb-6 md:bg-transparent md:static md:flex md:space-x-8 md:items-center md:justify-end`}
        >
          <ul className="flex flex-col gap-4 md:flex-row md:space-x-8 px-4 md:px-0 text-center mt-2">
            {isLanding && (
                <MoreMenu />
            )}

            <li>
              <RouterLink
                to="/task-completed"
                className="hover:text-purple-400 transition-colors cursor-pointer py-2 md:py-0"
              >
                Task Completed
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/samples"
                className="hover:text-purple-400 transition-colors cursor-pointer py-2 md:py-0"
              >
                Samples
              </RouterLink>
            </li>
            <li className=''>
              <RouterLink
                to="/sketch"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors text-center md:py-3 font-semibold"
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

const MoreMenu = () => {
  return (
    <>
      <li>
        <Link
          to="features"
          smooth={true}
          duration={500}
          offset={-50}
          className="hover:text-purple-400 transition-colors cursor-pointer py-2 md:py-0"
        >
          Features
        </Link>
      </li>
      <li>
        <Link
          to="how-it-works"
          smooth={true}
          duration={500}
          offset={-50}
          className="hover:text-purple-400 transition-colors cursor-pointer py-2 md:py-0"
        >
          How It Works
        </Link>
      </li>
      <li>
        <Link
          to="team-members"
          smooth={true}
          duration={500}
          offset={-50}
          className="hover:text-purple-400 transition-colors cursor-pointer py-2 md:py-0"
        >
          Team Members
        </Link>
      </li></>
  )
}