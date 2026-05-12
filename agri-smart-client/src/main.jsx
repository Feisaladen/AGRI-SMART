import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { UserProvider } from '../context/usercontext.jsx'
import CartProvider from '../context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in the client environment.')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <CartProvider>
        <UserProvider>
          <App />
          <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: '12px', fontSize: '14px' } }} />
        </UserProvider>
      </CartProvider>
    </ClerkProvider>
  </StrictMode>,
)
