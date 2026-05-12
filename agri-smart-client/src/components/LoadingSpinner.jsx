const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#efe7d6] px-6">
      <div className="flex flex-col items-center text-center animate-pulse">
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
          <div className="absolute h-20 w-20 rounded-full border-4 border-[#d8c995]/35" />
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-[#6f8f45] border-r-[#6f8f45]" />
        </div>

        <p className="text-3xl font-semibold tracking-[0.14em] text-[#2e3b24]">
          AGRI-SMART
        </p>
        <p className="mt-2 text-sm font-medium uppercase tracking-[0.26em] text-[#6d7f49]">
          Kilimo chako, soko lako
        </p>
        <p className="mt-4 text-sm text-stone-600">
          Loading your marketplace experience...
        </p>
      </div>
    </div>
  )
}

export default LoadingSpinner
