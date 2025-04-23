import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import PrivateRoute from './components/PrivateRoute'
import ProductPage from './pages/ProductPage'
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>
  )
}

export default App






