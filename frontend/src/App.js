import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import PrivateRoute from './components/PrivateRoute'
import ProductPage from './pages/ProductPage'
import SearchPage from './pages/SearchPage'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import ShippingScreen from './pages/ShippingScreen'
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import OrdersPage from "./pages/OrdersPage"


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/orders" element={<OrdersPage />} />

      </Routes>
    </>
  )
}

export default App







