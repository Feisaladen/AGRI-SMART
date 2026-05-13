import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import { useCart } from '../../../context/CartContext'
import BuyerSidebar from '../../components/BuyerSidebar'
import toast from 'react-hot-toast'

const Checkout = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { cartItems, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')

  const handleSubmit = async () => {
    if (!user?.id || cartItems.length === 0) return

    const trimmedPhone = phone.trim()
    const formattedPhone = trimmedPhone.startsWith('0')
      ? `254${trimmedPhone.slice(1)}`
      : trimmedPhone

    try {
      setLoading(true)

      for (const item of cartItems) {
        const itemTotal = Number(item.price) * Number(item.quantity)

        const orderResponse = await axios.post('/api/orders/create', {
          clerkId: user.id,
          productId: item._id,
          quantity: item.quantity,
          totalPrice: itemTotal
        })

        await axios.post('/api/payments/stk-push', {
          phone: formattedPhone,
          amount: itemTotal,
          orderId: orderResponse.data._id
        })
      }

      clearCart()
      toast.success('Order placed successfully!')
      navigate('/buyer/orders')
    } catch (error) {
      console.log(error)
      toast.error('Failed to place order. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-stone-100">
      <BuyerSidebar />
      <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">Checkout</h1>
            <p className="mt-1 text-sm text-stone-500">Confirm your order before placing it.</p>
          </div>

          {cartItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-10 text-center">
              <p className="text-lg font-medium text-stone-700">Your cart is empty.</p>
              <button
                type="button"
                onClick={() => navigate('/buyer/cart')}
                className="mt-6 rounded-full bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                Back to Cart
              </button>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-900">Order Items</h2>
                <div className="mt-4 space-y-3">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex flex-col gap-2 rounded-xl bg-stone-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-stone-900">{item.name}</p>
                        <p className="mt-0.5 text-sm text-stone-400">
                          Qty: {item.quantity} x KSh {Number(item.price).toLocaleString()}
                        </p>
                      </div>
                      <p className="font-semibold text-stone-900">
                        KSh {Number(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-stone-500">Final Total</p>
                <p className="mt-3 text-3xl font-semibold text-stone-900">KSh {Number(total).toLocaleString()}</p>
                <div className="mt-5 space-y-2 rounded-xl bg-stone-50 p-4 text-sm text-stone-600">
                  <div className="flex justify-between">
                    <span>Items</span>
                    <span className="font-medium text-stone-900">{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment</span>
                    <span className="font-medium text-stone-900">M-Pesa</span>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter M-Pesa phone number (07XXXXXXXX)"
                    className="rounded-xl border border-emerald-500 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="rounded-xl bg-emerald-700 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:bg-emerald-400"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </button>
                  <p className="text-sm text-stone-500">
                    You will receive an M-Pesa prompt on your phone to complete payment
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/buyer/cart')}
                    className="rounded-xl border border-stone-200 py-3 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
                  >
                    Back to Cart
                  </button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Checkout
