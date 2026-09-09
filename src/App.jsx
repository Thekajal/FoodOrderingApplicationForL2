import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Payment from './pages/Payment/Payment'
import OrderStatus from './pages/OrderStatus/OrderStatus'
import CustomerOrders from './pages/CustomerOrders/CustomerOrders'
import Admin from './pages/Admin/Admin'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'

const SESSION_USER_STORAGE_KEY = 'dummy-food-session-user'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => localStorage.getItem('dummy-food-auth') === 'true')
  const [theme, setTheme] = React.useState(() => localStorage.getItem('dummy-food-theme') || 'light')
  const [currentUser, setCurrentUser] = React.useState(() => {
    const savedUser = localStorage.getItem(SESSION_USER_STORAGE_KEY) || localStorage.getItem('dummy-food-user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [showLogin, setShowLogin] = React.useState(() => !isAuthenticated)

  const isAdmin = currentUser?.role === 'admin'

  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('dummy-food-theme', theme)
  }, [theme])

  const handleAuthenticate = (user) => {
    setCurrentUser(user)
    setIsAuthenticated(true)
    setShowLogin(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('dummy-food-auth')
    localStorage.removeItem(SESSION_USER_STORAGE_KEY)
    setCurrentUser(null)
    setIsAuthenticated(false)
    setShowLogin(true)
  }

  const handleToggleTheme = () => {
    setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} onAuthenticate={handleAuthenticate} authRequired={!isAuthenticated} /> : <></>}
      {isAuthenticated ? (
        <>
          <div className="app">
            <Navbar setShowLogin={setShowLogin} currentUser={currentUser} onLogout={handleLogout} theme={theme} onToggleTheme={handleToggleTheme} />
            <Routes>
              <Route path="/" element={isAdmin ? <Navigate to="/admin" replace /> : <Home />} />
              <Route path="/cart" element={isAdmin ? <Navigate to="/admin" replace /> : <Cart />} />
              <Route path="/order" element={isAdmin ? <Navigate to="/admin" replace /> : <PlaceOrder />} />
              <Route path="/payment" element={isAdmin ? <Navigate to="/admin" replace /> : <Payment />} />
              <Route path="/my-orders" element={isAdmin ? <Navigate to="/admin" replace /> : <CustomerOrders />} />
              <Route path="/order-status" element={isAdmin ? <Navigate to="/admin" replace /> : <OrderStatus />} />
              <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </>
      ) : null}
    </>

  )
}

export default App