import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from '../../api/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import FarmerSidebar from '../../components/FarmerSidebar'
import Topbar from '../../components/Topbar'
import { DashboardSkeleton } from '../../components/Skeleton'

const STATUS_STYLES = {
  completed: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  pending: 'bg-amber-100 text-amber-700 ring-amber-200',
  failed: 'bg-rose-100 text-rose-700 ring-rose-200'
}

const PaymentHistory = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (!user) return
    axios.get(`/api/payments/farmer/${user.id}`)
      .then(res => setPayments(Array.isArray(res.data) ? res.data : []))
      .catch((error) => {
        console.log(error)
        if (error.response?.status === 404 && error.response?.data?.message?.toLowerCase().includes('farm')) {
          toast.error('Create your farm profile first.')
          navigate('/farm-profile')
          return
        }
        toast.error('Failed to load payments')
      })
      .finally(() => setLoading(false))
  }, [navigate, user])

  const totalEarnings = payments
    .filter(p => p.status === 'completed')
    .reduce((acc, p) => acc + p.amount, 0)

  const filtered = filter === 'all' ? payments : payments.filter(p => p.status === filter)

  const counts = {
    all: payments.length,
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    failed: payments.filter(p => p.status === 'failed').length,
  }

  return (
    <div className="flex min-h-screen bg-stone-100">
      <FarmerSidebar dashboard={{}} />
      <div className="flex flex-1 flex-col">
        <Topbar title="Payment History" />
        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-5xl space-y-6">

            {/* Header */}
            <div>
              <h1 className="text-2xl font-semibold text-stone-900">Payment History</h1>
              <p className="mt-1 text-sm text-stone-500">{payments.length} total payment{payments.length !== 1 ? 's' : ''}</p>
            </div>

            {/* Stat Cards */}
            <section className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border-l-4 border-emerald-500 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-stone-500">Total Earnings</p>
                <p className="mt-3 text-3xl font-semibold text-stone-900">KSh {Number(totalEarnings).toLocaleString()}</p>
                <p className="mt-1 text-xs text-stone-400">From completed payments</p>
              </div>
              <div className="rounded-2xl border-l-4 border-amber-500 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-stone-500">Pending</p>
                <p className="mt-3 text-3xl font-semibold text-stone-900">{counts.pending}</p>
                <p className="mt-1 text-xs text-stone-400">Awaiting confirmation</p>
              </div>
              <div className="rounded-2xl border-l-4 border-rose-500 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-stone-500">Failed</p>
                <p className="mt-3 text-3xl font-semibold text-stone-900">{counts.failed}</p>
                <p className="mt-1 text-xs text-stone-400">Unsuccessful payments</p>
              </div>
            </section>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3">
              {[
                { key: 'all', label: 'All' },
                { key: 'completed', label: 'Completed' },
                { key: 'pending', label: 'Pending' },
                { key: 'failed', label: 'Failed' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${filter === tab.key ? 'bg-stone-900 text-white' : 'border border-stone-200 bg-white text-stone-500 hover:bg-stone-50'}`}
                >
                  {tab.label} ({counts[tab.key] ?? payments.length})
                </button>
              ))}
            </div>

            {loading ? <DashboardSkeleton /> : filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-16 text-center">
                <p className="text-lg font-medium text-stone-700">No payments found</p>
                <p className="mt-2 text-sm text-stone-400">Payments will appear here once buyers complete orders.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map(payment => (
                  <div key={payment._id} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h2 className="text-base font-semibold text-stone-900">{payment.order?.product?.name || 'Payment'}</h2>
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ${STATUS_STYLES[payment.status] || 'bg-stone-100 text-stone-600 ring-stone-200'}`}>
                            {payment.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-stone-500">
                          <span>Amount: <span className="font-medium text-stone-700">KSh {Number(payment.amount).toLocaleString()}</span></span>
                          <span>M-Pesa Ref: <span className="font-medium text-stone-700">{payment.mpesaRef || 'N/A'}</span></span>
                          <span>Date: <span className="font-medium text-stone-700">{new Date(payment.createdAt).toLocaleDateString()}</span></span>
                        </div>
                      </div>
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

export default PaymentHistory
