
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-gradient text-2xl font-bold">ResumeIQ</p>
      </Link>
      <Link to="/upload" className='primary-button w-fit'>
        <p>Upload esume</p>
      </Link>
    </nav>
  )
}

export default Navbar
