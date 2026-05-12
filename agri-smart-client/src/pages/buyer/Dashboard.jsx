import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import toast from 'react-hot-toast'
import { useCart } from '../../../context/CartContext'
import BuyerSidebar from '../../components/BuyerSidebar'
import Topbar from '../../components/Topbar'
import { DashboardSkeleton } from '../../components/Skeleton'

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-800 ring-amber-200',
  confirmed: 'bg-sky-100 text-sky-800 ring-sky-200',
  delivered: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  cancelled: 'bg-rose-100 text-rose-800 ring-rose-200'
}

const Dashboard = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { cartItems, total } = useCart()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) { setLoading(false); return }
    axios.get(`/api/orders/buyer/${user.id}`)
      .then(res => setOrders(Array.isArray(res.data) ? res.data : []))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false))
  }, [user?.id])

  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length
  const recentOrders = orders.slice(0, 3)

  return (
    <div className="flex min-h-screen bg-stone-100">
      <BuyerSidebar />

      <div className="flex flex-1 flex-col">
        <Topbar
          title="Dashboard"
          notificationCount={pendingOrders}
          notificationPath="/buyer/orders"
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-5xl space-y-6">

            {loading ? <DashboardSkeleton /> : (
              <>
                {/* Welcome Banner */}
                <div className="rounded-2xl bg-emerald-700 px-6 py-5 text-white">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-200">Buyer Dashboard</p>
                  <h1 className="mt-1 text-2xl font-semibold">Welcome back, {user?.firstName || 'there'}</h1>
                  <p className="mt-1 text-sm text-emerald-200">Here is your shopping activity at a glance.</p>
                </div>

                {/* Stats */}
                <section className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-emerald-500">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-stone-500">Cart Items</p>
                      <span className="text-xs font-medium text-slate-400">Cart</span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-stone-900">{cartItems.length}</p>
                    <p className="mt-1 text-xs text-stone-400">Ready for checkout</p>
                  </div>
                  <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-stone-500">Pending Orders</p>
                      <span className="text-xs font-medium text-slate-400">Orders</span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-stone-900">{pendingOrders}</p>
                    <p className="mt-1 text-xs text-stone-400">Awaiting delivery</p>
                  </div>
                  <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-amber-500">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-stone-500">Cart Total</p>
                      <span className="text-xs font-medium text-slate-400">Total</span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-stone-900">KSh {Number(total).toLocaleString()}</p>
                    <p className="mt-1 text-xs text-stone-400">Current cart value</p>
                  </div>
                </section>

                {/* Recent Orders */}
                <section className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-stone-900">Recent Orders</h2>
                      <p className="mt-1 text-sm text-stone-500">Your latest purchase activity.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/buyer/orders')}
                      className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
                    >
                      View All
                    </button>
                  </div>

                  {recentOrders.length === 0 ? (
                    <div className="mt-5 rounded-xl border border-dashed border-stone-200 bg-stone-50 p-8 text-center text-sm text-stone-400">
                      No orders yet. Start shopping from the marketplace!
                    </div>
                  ) : (
                    <div className="mt-5 space-y-3">
                      {recentOrders.map((order) => (
                        <div key={order._id} className="flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50 px-5 py-4">
                          <div>
                            <p className="font-medium text-stone-900">{order.product?.name || 'Product'}</p>
                            <p className="mt-1 text-sm text-stone-500">KSh {Number(order.totalprice || 0).toLocaleString()}</p>
                          </div>
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ring-1 ${STATUS_STYLES[order.status] || 'bg-stone-100 text-stone-700 ring-stone-200'}`}>
                            {order.status || 'pending'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
