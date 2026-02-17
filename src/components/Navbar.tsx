
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="p-4 border-b border-gray-200 mb-8">
      <ul className="flex gap-8 list-none m-0 p-0">
        <li>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Home
          </Link>
        </li>
        <li>
          <Link to="/analyzer" className="text-blue-600 hover:text-blue-800 font-medium">
            Analyzer
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
