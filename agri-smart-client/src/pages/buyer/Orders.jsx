import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import BuyerSidebar from '../../components/BuyerSidebar'

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-800 ring-amber-200',
  confirmed: 'bg-sky-100 text-sky-800 ring-sky-200',
  delivered: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  cancelled: 'bg-rose-100 text-rose-800 ring-rose-200'
}

const Orders = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) { setLoading(false); return }
    axios.get(`/api/checkout/${user.id}`)
      .then(res => setOrders(Array.isArray(res.data) ? res.data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [user?.id])

  return (
    <div className="flex min-h-screen bg-stone-100">
      <BuyerSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-stone-900">My Orders 📦</h1>
              <p className="mt-1 text-sm text-stone-500">Track all your purchases in one place.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/buyer/marketplace')}
              className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
            >
              Shop Again
            </button>
          </div>

          {loading ? (
            <p className="text-stone-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-10 text-center text-sm text-stone-400">
              No orders yet. Start shopping from the marketplace!
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const quantity = order.quantity ?? order.quanitity ?? 0
                const statusStyle = STATUS_STYLES[order.status] || 'bg-stone-100 text-stone-700 ring-stone-200'
                return (
                  <div key={order._id} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-stone-900">{order.product?.name || 'Product'}</p>
                        <p className="mt-1 text-sm text-stone-400">Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-xl bg-stone-50 px-4 py-3">
                            <p className="text-xs text-stone-400">Quantity</p>
                            <p className="mt-1 font-semibold text-stone-900">{quantity}</p>
                          </div>
                          <div className="rounded-xl bg-stone-50 px-4 py-3">
                            <p className="text-xs text-stone-400">Unit Price</p>
                            <p className="mt-1 font-semibold text-stone-900">KSh {Number(order.product?.price ?? 0).toLocaleString()}</p>
                          </div>
                          <div className="rounded-xl bg-stone-50 px-4 py-3">
                            <p className="text-xs text-stone-400">Total</p>
                            <p className="mt-1 font-semibold text-stone-900">KSh {Number(order.totalprice ?? 0).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ring-1 ${statusStyle}`}>
                        {order.status || 'pending'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Orders
