import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import toast from 'react-hot-toast'
import FarmerSidebar from '../../components/FarmerSidebar'
import Topbar from '../../components/Topbar'

const AddProduct = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', price: '', quantity: '', unit: '', description: '', photo: ''
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setForm((prev) => ({ ...prev, photo: reader.result }))
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.quantity || !form.unit) {
      toast.error('Please fill in name, price, quantity, and unit.')
      return
    }

    try {
      setLoading(true)
      await axios.post('/api/products/create', { clerkId: user.id, ...form })
      toast.success('Product added!')
      navigate('/farmer/products')
    } catch (error) {
      console.log(error)
      if (error.response?.status === 404 && error.response?.data?.message?.toLowerCase().includes('farm')) {
        toast.error('Create your farm profile before adding products.')
        navigate('/farm-profile')
        return
      }
      toast.error(error.response?.data?.message || 'Failed to add product.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-stone-100">
      <FarmerSidebar dashboard={{}} />
      <div className="flex flex-1 flex-col">
        <Topbar title="Add Product" />
        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">Product Details</h2>
              <p className="mt-1 text-sm text-stone-500">Fill in the details to list your product on the marketplace.</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-stone-700">Product Name</label>
                  <input name="name" onChange={handleChange} placeholder="e.g. Fresh Tomatoes" className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-stone-700">Price (KSh)</label>
                    <input name="price" type="number" onChange={handleChange} placeholder="0" className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-stone-700">Quantity</label>
                    <input name="quantity" type="number" onChange={handleChange} placeholder="0" className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-stone-700">Unit</label>
                  <select name="unit" onChange={handleChange} className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white">
                    <option value="">Select Unit</option>
                    <option value="kg">KG</option>
                    <option value="pieces">Pieces</option>
                    <option value="bags">Bags</option>
                    <option value="litres">Litres</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-stone-700">Description (optional)</label>
                  <textarea name="description" onChange={handleChange} placeholder="Describe your product..." rows={3} className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-stone-700">Product Photo</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm" />
                  {form.photo && <img src={form.photo} alt="Preview" className="mt-3 h-24 w-24 rounded-xl object-cover" />}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button onClick={handleSubmit} disabled={loading} className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:bg-emerald-300">
                  {loading ? 'Saving...' : 'Add Product'}
                </button>
                <button onClick={() => navigate('/farmer/products')} className="rounded-xl border border-stone-200 px-6 py-3 text-sm font-medium text-stone-600 transition hover:bg-stone-50">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AddProduct
