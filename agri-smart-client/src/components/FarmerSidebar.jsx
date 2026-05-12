import { useState } from 'react'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useNavigate, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Dashboard', path: '/farmer/dashboard', short: 'D' },
  { label: 'My Products', path: '/farmer/products', short: 'P' },
  { label: 'Add Product', path: '/farmer/add-product', short: 'A' },
  { label: 'Orders', path: '/farmer/orders', short: 'O' },
  { label: 'Payments', path: '/farmer/payments', short: 'Pa' },
  { label: '🤖 AI Advisor', path: '/farmer/ai-advisor', short: 'AI' },
]

const FarmerSidebar = ({ dashboard }) => {
  const { signOut } = useClerk()
  const { user } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`flex flex-col justify-between bg-slate-900 px-3 py-8 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div>
        <div className={`mb-8 ${collapsed ? 'items-center' : ''}`}>
          {!collapsed && (
            <>
              <p className="px-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-400">Agri-Smart</p>
              <h2 className="mt-1 px-2 text-xl font-bold leading-tight tracking-tight">Uber for your groceries</h2>
              <div className="mt-3 h-px bg-white/10" />
              <div className="mt-4 flex items-center gap-3 px-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                  {user?.firstName?.[0]?.toUpperCase() || 'F'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Welcome back, {user?.firstName || 'Farmer'}</p>
                  <p className="text-xs text-slate-400">{dashboard?.county || ''}</p>
                </div>
              </div>
            </>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                {user?.firstName?.[0]?.toUpperCase() || 'F'}
              </div>
            </div>
          )}
        </div>

        <nav className="space-y-1">
          {navLinks.map((link) => (
            <div key={link.path} className="group relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  navigate(link.path)
                }}
                className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition
                  ${location.pathname === link.path
                    ? collapsed ? 'text-white' : 'bg-white/20 text-white'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`}
              >
                {collapsed && location.pathname === link.path && (
                  <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-emerald-300" />
                )}
                {collapsed ? <span className="text-sm font-bold">{link.short}</span> : link.label}
              </button>
              {collapsed && (
                <div className="pointer-events-none absolute left-14 top-1/2 z-50 -translate-y-1/2 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  {link.label}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/10 ${collapsed ? 'justify-center' : ''}`}
        >
          <span>{collapsed ? '→' : '←'}</span>
          {!collapsed && 'Collapse'}
        </button>
        <button
          type="button"
          onClick={() => signOut({ redirectUrl: '/' })}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-rose-300 transition hover:bg-white/10 hover:text-rose-200 ${collapsed ? 'justify-center' : ''}`}
        >
          <span>Out</span>
          {!collapsed && 'Log Out'}
        </button>
      </div>
    </aside>
  )
}

export default FarmerSidebar
