const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse rounded-xl bg-stone-200 ${className}`} />
)

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-24 w-full rounded-2xl" />
    <div className="grid gap-4 sm:grid-cols-3">
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
    </div>
    <Skeleton className="h-64 rounded-2xl" />
  </div>
)

export default Skeleton
