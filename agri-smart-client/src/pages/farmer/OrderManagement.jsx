import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from '../../api/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import FarmerSidebar from '../../components/FarmerSidebar'
import Topbar from '../../components/Topbar'
import { DashboardSkeleton } from '../../components/Skeleton'

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-700 ring-amber-200',
  confirmed: 'bg-sky-100 text-sky-700 ring-sky-200',
  delivered: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  cancelled: 'bg-rose-100 text-rose-700 ring-rose-200'
}

const OrderManagement = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (!user) return
    axios.get(`/api/orders/farm/${user.id}`)
      .then(res => setOrders(Array.isArray(res.data) ? res.data : []))
      .catch((error) => {
        console.log(error)
        if (error.response?.status === 404 && error.response?.data?.message?.toLowerCase().includes('farm')) {
          toast.error('Create your farm profile first.')
          navigate('/farm-profile')
          return
        }
        toast.error('Failed to load orders')
      })
      .finally(() => setLoading(false))
  }, [navigate, user])

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await axios.patch(`/api/orders/${orderId}/status`, { status })
      setOrders(orders.map(o => o._id === orderId ? { ...o, status } : o))
      toast.success(`Order marked as ${status}`)
    } catch {
      toast.error('Failed to update order')
    }
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  }

  return (
    <div className="flex min-h-screen bg-stone-100">
      <FarmerSidebar dashboard={{}} />
      <div className="flex flex-1 flex-col">
        <Topbar
          title="Order Management"
          notificationCount={counts.pending}
          notificationPath="/farmer/orders"
        />
        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-5xl space-y-6">

            {/* Header */}
            <div>
              <h1 className="text-2xl font-semibold text-stone-900">Order Management</h1>
              <p className="mt-1 text-sm text-stone-500">{orders.length} total order{orders.length !== 1 ? 's' : ''}</p>
            </div>

            {/* Stat Pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { key: 'all', label: 'All', color: 'bg-stone-900 text-white' },
                { key: 'pending', label: 'Pending', color: 'bg-amber-100 text-amber-700' },
                { key: 'confirmed', label: 'Confirmed', color: 'bg-sky-100 text-sky-700' },
                { key: 'delivered', label: 'Delivered', color: 'bg-emerald-100 text-emerald-700' },
                { key: 'cancelled', label: 'Cancelled', color: 'bg-rose-100 text-rose-700' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${filter === tab.key ? tab.color + ' ring-2 ring-offset-1 ring-stone-300' : 'bg-white text-stone-500 border border-stone-200 hover:bg-stone-50'}`}
                >
                  {tab.label} ({counts[tab.key]})
                </button>
              ))}
            </div>

            {loading ? <DashboardSkeleton /> : filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-16 text-center">
                <p className="text-lg font-medium text-stone-700">No orders found</p>
                <p className="mt-2 text-sm text-stone-400">Orders from buyers will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map(order => (
                  <div key={order._id} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h2 className="text-base font-semibold text-stone-900">{order.product?.name || 'Product'}</h2>
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ${STATUS_STYLES[order.status] || 'bg-stone-100 text-stone-600 ring-stone-200'}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-stone-500">
                          <span>Qty: <span className="font-medium text-stone-700">{order.quantity}</span></span>
                          <span>Total: <span className="font-medium text-stone-700">KSh {Number(order.totalprice || 0).toLocaleString()}</span></span>
                          <span>Date: <span className="font-medium text-stone-700">{new Date(order.createdAt).toLocaleDateString()}</span></span>
                        </div>
                      </div>

                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-700 outline-none transition focus:border-emerald-500 focus:bg-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default OrderManagement
