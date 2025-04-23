import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { jwtDecode } from 'jwt-decode'

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const { cartItems } = useCart()


  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const decoded = jwtDecode(token)
          setUser({ name: decoded.name, email: decoded.email })
        } catch (err) {
          console.error('Failed to decode token:', err)
        }
      }
    }
  }, [user, setUser])



  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`)
  }

  return (
    <>
      <nav className="bg-teal-600 text-white p-4 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-yellow-300">E-store</Link>
          </div>

          {/* Center: Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex w-1/2">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow px-3 py-1 text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-black px-2"
            >
              <option value="All">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
              <option value="Games">Games</option>
            </select>
            <button className="bg-yellow-400 px-3 rounded-r text-black hover:bg-yellow-300">
              🔍
            </button>
          </form>

          {/* Right: Nav Links */}
          <div className="hidden md:flex space-x-6 text-sm items-center">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-xl">👤</span>
                  <span>Hello, {user.name || user.email || 'User'}</span>
                </div>
                <button onClick={handleLogout} className="text-red-400">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <div>Hello, sign in</div>
                  <div className="font-bold">Account & Lists</div>
                </Link>
                <Link to="/register">
                  <div className="font-bold">Register</div>
                </Link>
              </>
            )}
            <Link to="/orders">
              <div>Returns</div>
              <div className="font-bold">& Orders</div>
            </Link>
            <Link to="/cart" className="relative">
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full px-2 text-xs">
              {user ? cartItems.reduce((sum, item) => sum + item.qty, 0) : 0}
              </span>
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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-black px-2"
              >
                <option value="All">All</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
                <option value="Games">Games</option>
              </select>
              <button className="bg-yellow-400 px-3 rounded-r text-black">🔍</button>
            </form>

            <Link to="/cart" className="block">🛒 Cart</Link>
            <Link to="/orders" className="block">📦 Orders</Link>

            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-xl">👤</span>
                  <span>Hello, {user.name || user.email || 'User'}</span>
                </div>
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

      {/* Sub-navbar */}
      <div className="bg-teal-700 text-white text-sm px-4 py-2 flex justify-between items-center">
        <div className="flex gap-6">
          <Link to="/category/electronics" className="hover:underline">Electronics</Link>
          <Link to="/category/fashion" className="hover:underline">Fashion</Link>
          <Link to="/category/games" className="hover:underline">Games</Link>
          <Link to="/category/home" className="hover:underline">Home</Link>
          <Link to="/bestsellers" className="hover:underline">Best Sellers</Link>
          <Link to="/categories" className="hover:underline">Categories</Link>
          <Link to="/deals" className="hover:underline">Deals</Link>
        </div>
      </div>
    </>
  )
}
