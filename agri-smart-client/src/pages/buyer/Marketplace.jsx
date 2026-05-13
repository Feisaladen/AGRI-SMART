import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import { useCart } from '../../../context/CartContext'
import BuyerSidebar from '../../components/BuyerSidebar'

const Marketplace = () => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/marketplace')
      .then(res => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-stone-100">
      <BuyerSidebar />
      <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">Marketplace 🛍️</h1>
            <p className="mt-1 text-sm text-stone-500">Discover products sourced directly from farms.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
            <div className="shrink-0 rounded-xl bg-emerald-700 px-5 py-3 text-center text-sm font-medium text-white">
              {filteredProducts.length} items
            </div>
          </div>

          {loading ? (
            <p className="text-stone-500">Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-10 text-center text-sm text-stone-400">
              No products found.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <article key={product._id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="h-40 bg-gradient-to-br from-emerald-100 to-stone-100">
                    {product.photo
                      ? <img src={product.photo} alt={product.name} className="h-full w-full object-cover" />
                      : <div className="flex h-full items-center justify-center text-3xl">🌿</div>
                    }
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-lg font-semibold text-stone-900">{product.name}</h2>
                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">In Stock</span>
                    </div>
                    <p className="mt-1 text-xs text-stone-400">{product.farm?.name} · {product.farm?.county}</p>
                    <p className="mt-3 text-xl font-semibold text-stone-900">KSh {Number(product.price).toLocaleString()}</p>
                    <p className="text-xs text-stone-400">{product.quantity} {product.unit}</p>
                    <p className="mt-3 text-sm text-stone-500 line-clamp-2">{product.description || 'Fresh from the farm.'}</p>
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="mt-4 w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Marketplace
