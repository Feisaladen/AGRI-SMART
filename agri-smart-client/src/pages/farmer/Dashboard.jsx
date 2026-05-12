import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import toast from 'react-hot-toast'
import FarmerSidebar from '../../components/FarmerSidebar'
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
  const [dashboard, setDashboard] = useState({
    farmName: '',
    county: '',
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
    recentOrders: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!user?.id) { setLoading(false); return }
      try {
        const res = await axios.get(`/api/dashboard/farmer/${user.id}`)
        const data = res.data || {}
        setDashboard({
          farmName: data.farmName || data.farm?.name || 'Your Farm',
          county: data.county || data.farm?.county || 'County not set',
          totalProducts: data.totalProducts || 0,
          totalOrders: data.totalOrders || 0,
          totalEarnings: data.totalEarnings || 0,
          recentOrders: Array.isArray(data.recentOrders) ? data.recentOrders : []
        })
      } catch (error) {
        console.log(error)
        toast.error('Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [user?.id])

  return (
    <div className="flex min-h-screen bg-stone-100">
      <FarmerSidebar dashboard={dashboard} />

      <div className="flex flex-1 flex-col">
        <Topbar
          title={dashboard.farmName || 'Dashboard'}
          notificationCount={dashboard.recentOrders.filter(o => o.status === 'pending').length}
          notificationPath="/farmer/orders"
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-5xl space-y-6">

            {loading ? <DashboardSkeleton /> : (
              <>
                {/* Welcome Banner */}
                <div className="rounded-2xl bg-emerald-700 px-6 py-5 text-white">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-200">{dashboard.farmName}</p>
                  <h1 className="mt-1 text-2xl font-semibold">Welcome back, {user?.firstName || 'Farmer'}</h1>
                  <p className="mt-1 text-sm text-emerald-200">Here is what is happening on your farm today.</p>
                </div>

                {/* Stats */}
                <section className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-emerald-500">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-stone-500">Total Products</p>
                      <span className="text-xs font-medium text-slate-400">Products</span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-stone-900">{dashboard.totalProducts}</p>
                    <p className="mt-1 text-xs text-stone-400">Active listings</p>
                  </div>
                  <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-stone-500">Total Orders</p>
                      <span className="text-xs font-medium text-slate-400">Orders</span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-stone-900">{dashboard.totalOrders}</p>
                    <p className="mt-1 text-xs text-stone-400">From all buyers</p>
                  </div>
                  <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-amber-500">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-stone-500">Total Earnings</p>
                      <span className="text-xs font-medium text-slate-400">Earnings</span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-stone-900">KSh {Number(dashboard.totalEarnings).toLocaleString()}</p>
                    <p className="mt-1 text-xs text-stone-400">Revenue earned</p>
                  </div>
                </section>

                {/* Recent Orders */}
                <section className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-stone-900">Recent Orders</h2>
                      <p className="mt-1 text-sm text-stone-500">Latest activity from your buyers.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/farmer/orders')}
                      className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
                    >
                      View All
                    </button>
                  </div>

                  {dashboard.recentOrders.length === 0 ? (
                    <div className="mt-5 rounded-xl border border-dashed border-stone-200 bg-stone-50 p-8 text-center text-sm text-stone-400">
                      No orders yet. Once buyers place orders, they will appear here.
                    </div>
                  ) : (
                    <div className="mt-5 space-y-3">
                      {dashboard.recentOrders.map((order, index) => (
                        <div key={order._id || index} className="flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50 px-5 py-4">
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
