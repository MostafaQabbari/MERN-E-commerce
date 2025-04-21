import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search:', search)
  }

  return (
    <nav className="bg-teal-600 text-white p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Left: Logo + Location */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-yellow-300">E-store</Link>
          <div className="hidden md:block text-sm">
          </div>
        </div>

        {/* Center: Search bar */}
        <form onSubmit={handleSearch} className="hidden md:flex w-1/2">
          <select className="rounded-l px-2 text-black">
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="flex-grow px-3 py-1 text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-yellow-400 px-3 rounded-r text-black hover:bg-yellow-300">
            🔍
          </button>
        </form>

        {/* Right: Nav Links */}
        <div className="hidden md:flex space-x-6 text-sm items-center">
          {user ? (
            <>
              <div>Hello, {user.name}</div>
              <button onClick={handleLogout} className="text-red-400">Logout</button>
            </>
          ) : (
            <Link to="/login">
              <div>Hello, sign in</div>
              <div className="font-bold">Account & Lists</div>
            </Link>
          )}
          <Link to="/orders">
            <div>Returns</div>
            <div className="font-bold">& Orders</div>
          </Link>
          <Link to="/cart" className="relative">
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full px-2 text-xs">0</span>
            <div className="text-2xl">🛒</div>
            <div className="font-bold">Cart</div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow px-3 py-1 text-black rounded-l"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-yellow-400 px-3 rounded-r text-black">🔍</button>
          </form>

          <Link to="/cart" className="block">🛒 Cart</Link>
          <Link to="/orders" className="block">📦 Orders</Link>

          {user ? (
            <>
              <div>Hello, {user.name}</div>
              <button onClick={handleLogout} className="text-red-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block">🔐 Login</Link>
              <Link to="/register" className="block">📝 Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
