import { useUser } from '@clerk/clerk-react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppUser } from '../context/usercontext'
import SignInPage from './pages/auth/SignInPage'
import SignUpPage from './pages/auth/SignUpPage'
import RoleSelection from './pages/auth/RoleSelection'
import FarmProfile from './pages/farmer/farmprofile'
import AddProduct from './pages/farmer/AddProduct'
import ProductList from './pages/farmer/Productlist'
import OrderManagement from './pages/farmer/OrderManagement'
import PaymentHistory from './pages/farmer/paymentHistory'
import Dashboard from './pages/farmer/Dashboard'
import AiAdvisor from './pages/farmer/AiAdvisor'
import BuyerDashboard from './pages/buyer/Dashboard'
import Marketplace from './pages/buyer/Marketplace'
import Cart from './pages/buyer/Cart'
import Checkout from './pages/buyer/Checkout'
import Orders from './pages/buyer/Orders'
import LandingPage from './pages/LandingPage'
import LoadingSpinner from './components/LoadingSpinner'

const AppRoutes = () => {
  const { user, isLoaded } = useUser()
  const { dbUser, loading } = useAppUser()

  if (!isLoaded || loading) return <LoadingSpinner />

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />

      <Route
        path="/dashboard"
        element={
          !user ? <Navigate to="/sign-in" /> :
          !dbUser ? <Navigate to="/select-role" /> :
          dbUser.role === 'farmer' ? <Navigate to="/farmer/dashboard" /> :
          <Navigate to="/buyer/home" />
        }
      />

      <Route
        path="/select-role"
        element={
          !user ? <Navigate to="/sign-in" /> :
          dbUser ? (
            dbUser.role === 'farmer' ? <Navigate to="/farmer/dashboard" /> :
            <Navigate to="/buyer/home" />
          ) : <RoleSelection />
        }
      />

      <Route
        path="/farm-profile"
        element={!user ? <Navigate to="/sign-in" /> : <FarmProfile />}
      />

      <Route
        path="/farmer/add-product"
        element={!user ? <Navigate to="/sign-in" /> : <AddProduct />}
      />

      <Route
        path="/farmer/products"
        element={!user ? <Navigate to="/sign-in" /> : <ProductList />}
      />

      <Route
        path="/farmer/orders"
        element={!user ? <Navigate to="/sign-in" /> : <OrderManagement />}
      />

      <Route
        path="/farmer/payments"
        element={!user ? <Navigate to="/sign-in" /> : <PaymentHistory />}
      />

      <Route
        path="/farmer/dashboard"
        element={!user ? <Navigate to="/sign-in" /> : <Dashboard />}
      />

      <Route
        path="/farmer/ai-advisor"
        element={!user ? <Navigate to="/sign-in" /> : <AiAdvisor />}
      />

      <Route
        path="/buyer/home"
        element={!user ? <Navigate to="/sign-in" /> : <BuyerDashboard />}
      />

      <Route
        path="/buyer/marketplace"
        element={!user ? <Navigate to="/sign-in" /> : <Marketplace />}
      />

      <Route
        path="/buyer/cart"
        element={!user ? <Navigate to="/sign-in" /> : <Cart />}
      />

      <Route
        path="/buyer/checkout"
        element={!user ? <Navigate to="/sign-in" /> : <Checkout />}
      />

      <Route
        path="/buyer/orders"
        element={!user ? <Navigate to="/sign-in" /> : <Orders />}
      />
    </Routes>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
