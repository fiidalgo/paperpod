import Link from 'next/link'
import { FaMicrophone } from 'react-icons/fa'

export function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <FaMicrophone className="text-purple-500 text-2xl" />
            <span className="text-white text-xl font-bold">PaperPod</span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-gray-300 hover:text-white">
                  My Library
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
} 