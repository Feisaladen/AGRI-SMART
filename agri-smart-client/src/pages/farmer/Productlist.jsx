import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import FarmerSidebar from '../../components/FarmerSidebar'
import Topbar from '../../components/Topbar'
import { DashboardSkeleton } from '../../components/Skeleton'

const ProductList = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    axios.get(`/api/products/farm/${user.id}`)
      .then(res => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch((error) => {
        console.log(error)
        if (error.response?.status === 404 && error.response?.data?.message?.toLowerCase().includes('farm')) {
          toast.error('Create your farm profile first.')
          navigate('/farm-profile')
          return
        }
        toast.error('Failed to load products')
      })
      .finally(() => setLoading(false))
  }, [user])

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`)
      setProducts(products.filter(p => p._id !== productId))
      toast.success('Product deleted')
    } catch {
      toast.error('Failed to delete product')
    }
  }

  const handleStatusToggle = async (productId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active'
    try {
      await axios.patch(`/api/products/${productId}`, { status: newStatus })
      setProducts(products.map(p => p._id === productId ? { ...p, status: newStatus } : p))
      toast.success(`Product ${newStatus}`)
    } catch {
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="flex min-h-screen bg-stone-100">
      <FarmerSidebar dashboard={{}} />
      <div className="flex flex-1 flex-col">
        <Topbar title="My Products" />
        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-5xl space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-stone-900">My Products</h1>
                <p className="mt-1 text-sm text-stone-500">{products.length} listing{products.length !== 1 ? 's' : ''} on the marketplace</p>
              </div>
              <button
                onClick={() => navigate('/farmer/add-product')}
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                + Add Product
              </button>
            </div>

            {loading ? <DashboardSkeleton /> : products.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-16 text-center">
                <p className="text-lg font-medium text-stone-700">No products yet</p>
                <p className="mt-2 text-sm text-stone-400">Add your first product to start selling on the marketplace.</p>
                <button
                  onClick={() => navigate('/farmer/add-product')}
                  className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                  Add First Product
                </button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map(product => (
                  <div key={product._id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
                    <div className="h-36 bg-gradient-to-br from-emerald-50 to-stone-100">
                      {product.photo
                        ? <img src={product.photo} alt={product.name} className="h-full w-full object-cover" />
                        : <div className="flex h-full items-center justify-center text-sm font-medium text-stone-400">No Image</div>
                      }
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="text-base font-semibold text-stone-900">{product.name}</h2>
                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${product.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-500'}`}>
                          {product.status === 'active' ? 'Active' : 'Paused'}
                        </span>
                      </div>
                      <p className="mt-1 text-lg font-semibold text-stone-900">KSh {Number(product.price).toLocaleString()}<span className="text-sm font-normal text-stone-400"> / {product.unit}</span></p>
                      <p className="mt-0.5 text-xs text-stone-400">Qty: {product.quantity}</p>

                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleStatusToggle(product._id, product.status)}
                          className={`flex-1 rounded-xl py-2 text-xs font-medium transition ${product.status === 'active' ? 'border border-stone-200 text-stone-600 hover:bg-stone-50' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
                        >
                          {product.status === 'active' ? 'Pause' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="flex-1 rounded-xl border border-rose-200 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-50"
                        >
                          Delete
                        </button>
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

export default ProductList
