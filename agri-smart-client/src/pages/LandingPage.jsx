import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import backgroundImage from '../../buyer/backgroundimage.jpg'

const features = [
  {
    title: 'For farmers',
    text: 'List produce, update stock, and manage orders from one simple place.',
  },
  {
    title: 'For buyers',
    text: 'Find fresh farm products faster and buy directly from trusted growers.',
  },
  {
    title: 'Direct trade',
    text: 'Reduce middlemen and keep the connection between farm and market clear.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create your path',
    subtitle: 'Jisajili kwa njia yako',
    text: 'Farmers create a farm profile and buyers open an account to start browsing products.',
    swahili: 'Mkulima anafungua wasifu wa shamba, mnunuzi anafungua akaunti ili kuanza kuona bidhaa.',
  },
  {
    number: '02',
    title: 'List or discover',
    subtitle: 'Weka au tafuta bidhaa',
    text: 'Farmers add produce to the marketplace while buyers compare fresh products from different farms.',
    swahili: 'Wakulima wanaweka mazao sokoni huku wanunuzi wakilinganisha bidhaa safi kutoka mashamba tofauti.',
  },
  {
    number: '03',
    title: 'Order and fulfil',
    subtitle: 'Agiza na kamilisha',
    text: 'Buyers place orders and farmers manage delivery, payments, and order updates in one flow.',
    swahili: 'Wanunuzi wanaagiza huku wakulima wakisimamia usafirishaji, malipo, na taarifa za oda katika mfumo mmoja.',
  },
]

const LandingPage = () => {
  const navigate = useNavigate()
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      navigate('/select-role')
    }
  }, [isLoaded, user, navigate])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#efe7d6] text-stone-900">
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(95deg, rgba(21, 32, 17, 0.84) 0%, rgba(21, 32, 17, 0.68) 42%, rgba(21, 32, 17, 0.38) 100%), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(232,214,151,0.14),_transparent_28%)]" />

        <header className="relative z-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
              <div>
                <p className="bg-[linear-gradient(120deg,#f5edd1_0%,#ffffff_45%,#d8c995_100%)] bg-clip-text text-base font-semibold tracking-[0.08em] text-transparent animate-pulse">
                  AGRI-SMART
                </p>
                <p className="text-xs uppercase tracking-[0.24em] text-white/65">Farm to market</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/sign-in')}
                className="rounded-full border border-white/18 bg-white/8 px-5 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/14"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/sign-up')}
                className="rounded-full bg-[#e2cf97] px-5 py-2 text-sm font-semibold text-stone-900 shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition hover:bg-[#ecdbaa]"
              >
                Get Started
              </button>
            </div>
          </div>
        </header>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-12 lg:pb-24 lg:pt-16">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c995]/35 bg-white/8 px-4 py-2 text-sm font-medium text-[#f3e7be] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#d8c995]" />
                Fresh produce, direct from the source
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.04] text-white md:text-6xl lg:text-7xl">
                Agri-Smart
                <span className="mt-3 block font-bold text-[#ecdbaa]">Kilimo chako, soko lako.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
                A simpler marketplace for farmers selling produce and buyers sourcing it directly.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/sign-up')}
                  className="rounded-full bg-[#7b9b4d] px-8 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(0,0,0,0.28)] ring-1 ring-[#d8c995]/35 transition hover:bg-[#6d8c45]"
                >
                  Create Account
                </button>
                <button
                  onClick={() => navigate('/sign-in')}
                  className="rounded-full border border-white/18 bg-white/8 px-8 py-4 text-base font-medium text-white backdrop-blur-md transition hover:bg-white/14"
                >
                  Sign In
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/8 p-5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
              <div className="rounded-[1.5rem] bg-[#f3ecda] p-6 text-stone-900">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Built for both sides</p>
                <div className="mt-5 space-y-4">
                  {features.map((feature) => (
                    <div key={feature.title} className="rounded-[1.2rem] bg-white/70 p-4">
                      <h2 className="text-lg font-semibold text-stone-900">{feature.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-stone-600">{feature.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/12 bg-white/8 p-5 backdrop-blur-md">
              <p className="text-3xl font-semibold text-white">47</p>
              <p className="mt-1 text-sm text-white/70">Counties represented</p>
            </div>
            <div className="rounded-3xl border border-white/12 bg-white/8 p-5 backdrop-blur-md">
              <p className="text-3xl font-semibold text-white">Direct</p>
              <p className="mt-1 text-sm text-white/70">Farmer to buyer trade</p>
            </div>
            <div className="rounded-3xl border border-white/12 bg-white/8 p-5 backdrop-blur-md">
              <p className="text-3xl font-semibold text-white">Simple</p>
              <p className="mt-1 text-sm text-white/70">Listing and ordering flow</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#efe7d6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6d7f49]">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-950 lg:text-4xl">
              A clearer path from listing to purchase.
            </h2>
            <p className="mt-4 text-base leading-8 text-stone-600">
              Three simple steps for farmers and buyers, explained in English and Kiswahili.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`rounded-[2rem] p-7 shadow-[0_16px_45px_rgba(120,113,108,0.10)] ${
                  index === 1 ? 'bg-[#2e3b24] text-white' : 'bg-[#f8f3e7] text-stone-900'
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold ${
                    index === 1 ? 'bg-white/10 text-white' : 'bg-[#6f8f45] text-white'
                  }`}
                >
                  {step.number}
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{step.title}</h3>
                <p className={`mt-2 text-sm font-medium uppercase tracking-[0.18em] ${index === 1 ? 'text-[#d8c995]' : 'text-[#6d7f49]'}`}>
                  {step.subtitle}
                </p>
                <p className={`mt-3 leading-7 ${index === 1 ? 'text-white/72' : 'text-stone-600'}`}>
                  {step.text}
                </p>
                <p className={`mt-3 leading-7 ${index === 1 ? 'text-white/72' : 'text-stone-600'}`}>
                  {step.swahili}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f3e7] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[2.25rem] bg-[#2e3b24] px-8 py-12 text-white shadow-[0_20px_70px_rgba(46,59,36,0.22)] lg:px-12">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d8c995]">Start here</p>
              <h2 className="mt-4 text-3xl font-semibold lg:text-5xl">
                Bring farms and markets onto one platform.
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/78">
                Create an account to start listing produce or sign in to continue managing your marketplace activity.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/sign-up')}
                className="rounded-full bg-[#e2cf97] px-8 py-4 text-base font-semibold text-stone-900 shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition hover:bg-[#ecdbaa]"
              >
                Create Account
              </button>
              <button
                onClick={() => navigate('/sign-in')}
                className="rounded-full border border-white/18 bg-white/8 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition hover:bg-white/14"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#efe7d6] py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-stone-600">
          <p>&copy; 2026 Agri-Smart. Farm to market, made simpler.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
