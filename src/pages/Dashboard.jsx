import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import axiosInstance from '../api/axios.js'

function Dashboard() {
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleCheckBalance = async () => {
    setIsLoading(true)

    try {
      const response = await axiosInstance.get('/check-balance')
      setMessage(`🎉 Your balance is ₹${response.data.balance}`)
      setMessageType('success')
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    } catch {
      setMessage('Session expired. Please login again.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="dashboard-shell relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      {showConfetti ? (
        <Confetti width={windowSize.width} height={windowSize.height} />
      ) : null}

      <div className="dashboard-noise" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="premium-panel flex items-center justify-between rounded-2xl px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-slate-300/85">
              KodBank Private Banking
            </p>
            <h1 className="font-display text-3xl text-white md:text-4xl">
              Account Command Center
            </h1>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Live</p>
            <p className="text-sm font-semibold text-emerald-300">Secure Session</p>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-5">
          <section className="premium-panel rounded-3xl p-7 md:col-span-3">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/90">
              Balance Snapshot
            </p>
            <div className="mt-4 rounded-2xl border border-white/15 bg-slate-950/55 p-6">
              <p className="text-sm text-slate-300">Current portfolio value</p>
              <p className="mt-2 font-display text-5xl text-white md:text-6xl">
                {messageType === 'success'
                  ? message.replace('🎉 Your balance is ', '')
                  : '₹ --'}
              </p>
              <p className="mt-3 text-sm text-slate-400">
                Updated on secure request from your bank server.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-400">Region</p>
                <p className="mt-2 text-sm font-semibold text-white">India Core</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-400">Tier</p>
                <p className="mt-2 text-sm font-semibold text-white">Premium</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-400">Latency</p>
                <p className="mt-2 text-sm font-semibold text-emerald-300">&lt; 120ms</p>
              </div>
            </div>
          </section>

          <section className="premium-panel rounded-3xl p-7 md:col-span-2">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-300/90">
              Quick Action
            </p>
            <button
              type="button"
              onClick={handleCheckBalance}
              disabled={isLoading}
              className="button-shine mt-5 w-full rounded-xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-100 px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-900 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Checking...' : 'Check Balance'}
            </button>

            <div
              className={`mt-5 min-h-24 rounded-xl border px-4 py-3 text-sm ${
                messageType === 'success'
                  ? 'border-emerald-300/40 bg-emerald-500/10 text-emerald-200'
                  : messageType === 'error'
                    ? 'border-rose-300/35 bg-rose-500/10 text-rose-200'
                    : 'border-white/10 bg-slate-900/40 text-slate-300'
              }`}
            >
              {message || 'Tap check balance to fetch your latest balance securely.'}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
