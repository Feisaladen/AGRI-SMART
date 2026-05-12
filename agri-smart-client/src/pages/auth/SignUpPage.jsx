import { SignUp } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import backgroundImage from '../../../buyer/backgroundimage.jpg'

const clerkAppearance = {
  variables: {
    colorPrimary: '#6f8f45',
    colorBackground: '#f8f3e7',
    colorText: '#2f2a23',
    colorInputBackground: '#fffdf7',
    colorInputText: '#2f2a23',
    borderRadius: '18px',
  },
  elements: {
    card: 'shadow-none bg-transparent w-full',
    rootBox: 'w-full max-w-full',
    headerTitle: 'hidden',
    headerSubtitle: 'hidden',
    socialButtonsBlockButton:
      'rounded-2xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 min-h-12',
    formButtonPrimary:
      'rounded-2xl bg-[#6f8f45] text-white shadow-[0_12px_28px_rgba(0,0,0,0.16)] hover:bg-[#617d3d] min-h-12',
    formFieldInput:
      'rounded-2xl border border-stone-200 bg-[#fffdf7] text-stone-900 focus:border-[#6f8f45] focus:ring-[#6f8f45] min-h-12',
    footerActionLink: 'text-[#6f8f45] hover:text-[#617d3d]',
    formFieldLabel: 'text-stone-700',
    dividerLine: 'bg-stone-200',
    dividerText: 'text-stone-400',
    identityPreviewText: 'text-stone-700',
    formResendCodeLink: 'text-[#6f8f45] hover:text-[#617d3d]',
    otpCodeFieldInput:
      'rounded-2xl border border-stone-200 bg-[#fffdf7] text-stone-900 focus:border-[#6f8f45]',
  },
}

const SignUpPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#efe7d6]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section
          className="relative hidden overflow-hidden lg:block"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(21, 32, 17, 0.8) 0%, rgba(21, 32, 17, 0.56) 45%, rgba(21, 32, 17, 0.36) 100%), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(232,214,151,0.18),_transparent_28%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between px-10 py-12 text-white">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-fit rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md transition hover:bg-white/16"
            >
              Back Home
            </button>

            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e6d4a3]">
                Sign Up
              </p>
              <h1 className="mt-4 text-5xl font-semibold leading-tight">
                Create your account.
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/78">
                Step into a simpler marketplace for farmers selling produce and buyers sourcing directly.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.8rem] border border-white/12 bg-white/10 p-6 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.2em] text-white/65">Kilimo chako, soko lako</p>
                <p className="mt-3 text-sm leading-7 text-white/78">
                  Start with one account and move into the role that fits your market journey.
                </p>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/18 p-5 backdrop-blur-md">
                  <p className="text-sm font-semibold text-[#e6d4a3]">For farmers</p>
                  <p className="mt-2 text-sm leading-7 text-white/74">
                    Set up your farm, list produce, and begin selling with clarity.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/18 p-5 backdrop-blur-md">
                  <p className="text-sm font-semibold text-[#e6d4a3]">For buyers</p>
                  <p className="mt-2 text-sm leading-7 text-white/74">
                    Create an account and start discovering fresh products from farms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:items-center lg:justify-center lg:px-8 lg:py-10">
          <div className="w-full max-w-lg rounded-[1.8rem] border border-[#ddd1b4] bg-[#f8f3e7] p-4 shadow-[0_20px_60px_rgba(95,82,54,0.12)] sm:rounded-[2.2rem] sm:p-6 lg:p-8">
            <div
              className="mb-5 overflow-hidden rounded-[1.5rem] bg-[#2e3b24] p-5 text-white lg:hidden"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(21, 32, 17, 0.88) 0%, rgba(21, 32, 17, 0.64) 100%), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <button
                type="button"
                onClick={() => navigate('/')}
                className="rounded-full border border-white/18 bg-white/10 px-3 py-2 text-xs font-medium backdrop-blur-md transition hover:bg-white/16"
              >
                Back Home
              </button>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#e6d4a3]">
                Sign Up
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight">
                Create your account.
              </h1>
              <p className="mt-3 text-sm leading-7 text-white/78">
                Step into a simpler marketplace for farmers and buyers.
              </p>
            </div>

            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6d7f49]">
                  Agri-Smart
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-stone-900 sm:text-3xl">
                  Create your account
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-7 text-stone-600">
                  Join as a farmer or buyer and continue into the right path after sign up.
                </p>
              </div>
              <div className="hidden rounded-2xl bg-[#ede3c7] px-4 py-3 text-right sm:block">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Join</p>
                <p className="mt-1 text-sm font-semibold text-stone-800">New account setup</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.6rem] bg-white/35 p-1">
              <SignUp
                routing="path"
                path="/sign-up"
                signInUrl="/sign-in"
                forceRedirectUrl="/select-role"
                appearance={clerkAppearance}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SignUpPage                       
