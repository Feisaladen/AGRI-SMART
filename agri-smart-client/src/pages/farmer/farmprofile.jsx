import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import toast from 'react-hot-toast'

const COUNTIES = ['Baringo','Bomet','Bungoma','Busia','Elgeyo-Marakwet','Embu','Garissa','Homa Bay','Isiolo','Kajiado','Kakamega','Kericho','Kiambu','Kilifi','Kirinyaga','Kisii','Kisumu','Kitui','Kwale','Laikipia','Lamu','Machakos','Makueni','Mandera','Marsabit','Meru','Migori','Mombasa',"Murang'a",'Nairobi','Nakuru','Nandi','Narok','Nyamira','Nyandarua','Nyeri','Samburu','Siaya','Taita-Taveta','Tana River','Tharaka-Nithi','Trans Nzoia','Turkana','Uasin Gishu','Vihiga','Wajir','West Pokot']

const CROPS = ['Maize','Wheat','Rice','Sorghum','Millet','Barley','Beans','Lentils','Chickpeas','Green Grams','Cowpeas','Pigeon Peas','Soybeans','Groundnuts','Sunflower','Sesame','Cassava','Sweet Potatoes','Irish Potatoes','Yams','Arrowroots','Bananas','Plantains','Mangoes','Avocados','Oranges','Lemons','Passion Fruit','Pineapples','Pawpaw','Guava','Macadamia','Coffee','Tea','Sugarcane','Cotton','Pyrethrum','Tobacco','Tomatoes','Kale','Spinach','Cabbage','Onions','Carrots','Capsicum','Eggplant','Cucumber','Pumpkin','Watermelon']

const FarmProfile = () => {
  const { user } = useUser() 
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', county: '', crops: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await axios.post('/api/farms/create', {
        clerkId: user.id,
        name: form.name,
        county: form.county,
        crops: [form.crops]
      })
      toast.success('Farm profile created! 🌾')
      navigate('/farmer/dashboard')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">

      {/* Left Panel */}
      <div className="hidden w-2/5 flex-col justify-between bg-emerald-900 px-10 py-12 text-white lg:flex">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-300">Agri-Smart</p>
          <h1 className="mt-2 text-2xl font-bold leading-tight">Uber for your groceries 🛒</h1>
          <div className="mt-6 h-px bg-white/10" />
          <h2 className="mt-8 text-3xl font-semibold leading-snug">Set up your farm profile</h2>
          <p className="mt-4 text-sm leading-7 text-emerald-200">
            Tell us about your farm so buyers can find your products. This only takes a minute.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-sm font-medium text-emerald-200">🌾 List your products</p>
            <p className="mt-1 text-xs text-emerald-300">After setup, you can start adding products to the marketplace.</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-sm font-medium text-emerald-200">📦 Receive orders</p>
            <p className="mt-1 text-xs text-emerald-300">Buyers across Kenya will be able to find and order from your farm.</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-sm font-medium text-emerald-200">💰 Track earnings</p>
            <p className="mt-1 text-xs text-emerald-300">Monitor your revenue and order history from your dashboard.</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-1 flex-col justify-center bg-stone-50 px-8 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-700">Step 1 of 1</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-900">Farm Details</h2>
          <p className="mt-2 text-sm text-stone-500">Fill in your farm information to get started.</p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-stone-700">Farm Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Kamau Fresh Farm"
                className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-stone-700">County</label>
              <select
                name="county"
                value={form.county}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="" disabled>Select your county</option>
                {COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-stone-700">Primary Crop</label>
              <select
                name="crops"
                value={form.crops}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="" disabled>Select your main crop</option>
                {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !form.name || !form.county || !form.crops}
              className="w-full rounded-xl bg-emerald-700 py-3.5 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-300"
            >
              {loading ? 'Setting up your farm...' : 'Complete Setup →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmProfile
