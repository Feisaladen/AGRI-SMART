import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Topbar = ({ title, notificationCount = 0, notificationPath = '#' }) => {
  const { user } = useUser()
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between border-b border-stone-200 bg-white px-8 py-4">
      <h1 className="text-lg font-semibold text-stone-900">{title}</h1>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(notificationPath)}
          className="relative rounded-xl border border-stone-200 p-2 text-stone-500 transition hover:bg-stone-50"
        >
          Alerts
          {notificationCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
            {user?.firstName?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="text-sm font-medium text-stone-700">{user?.firstName || 'User'}</span>
        </div>
      </div>
    </div>
  )
}

export default Topbar
