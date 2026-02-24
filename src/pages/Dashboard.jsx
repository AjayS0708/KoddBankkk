import { useEffect, useMemo, useState } from 'react'
import Confetti from 'react-confetti'
import axiosInstance from '../api/axios.js'

function Dashboard() {
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [balance, setBalance] = useState(null)
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

  const currentDate = useMemo(
    () =>
      new Date().toLocaleDateString('en-IN', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    [],
  )

  const handleCheckBalance = async () => {
    setIsLoading(true)

    try {
      const response = await axiosInstance.get('/check-balance')
      const fetchedBalance = response.data.balance
      setBalance(fetchedBalance)
      setMessage(`🎉 Your balance is ₹${fetchedBalance}`)
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
    <div className="banking-shell relative min-h-screen overflow-hidden px-4 py-8 text-slate-100 md:px-8">
      {showConfetti ? (
        <Confetti width={windowSize.width} height={windowSize.height} />
      ) : null}

      <div className="banking-grid-overlay" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="glass-panel mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-amber-300/90">
              KodBank Private
            </p>
            <h1 className="font-display text-3xl text-white md:text-4xl">
              Premium Banking Dashboard
            </h1>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/5 px-4 py-2">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Today</p>
            <p className="text-sm font-semibold text-white">{currentDate}</p>
          </div>
        </header>

        <main className="grid gap-6 xl:grid-cols-12">
          <section className="space-y-6 xl:col-span-8">
            <div className="glass-panel rounded-3xl p-6 md:p-7">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
                Primary Card
              </p>
              <div className="credit-card mt-4 rounded-3xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                      KodBank Black
                    </p>
                    <p className="mt-2 font-display text-2xl text-white">VISA Signature</p>
                  </div>
                  <div className="chip" />
                </div>
                <p className="mt-8 text-2xl tracking-[0.22em] text-white">
                  4387 2026 9090 7761
                </p>
                <div className="mt-7 flex items-end justify-between text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">
                      Card Holder
                    </p>
                    <p className="mt-1 font-semibold text-white">AJAY SHARMA</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">
                      Expires
                    </p>
                    <p className="mt-1 font-semibold text-white">12/30</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <article className="glass-panel rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                  Available Balance
                </p>
                <p className="mt-3 font-display text-3xl text-white">
                  {balance !== null ? `₹${balance}` : '₹ --'}
                </p>
              </article>
              <article className="glass-panel rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                  Monthly Spend
                </p>
                <p className="mt-3 font-display text-3xl text-white">₹28,450</p>
              </article>
              <article className="glass-panel rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                  Rewards Points
                </p>
                <p className="mt-3 font-display text-3xl text-white">12,760</p>
              </article>
            </div>
          </section>

          <section className="space-y-6 xl:col-span-4">
            <div className="glass-panel rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                Secure Action
              </p>
              <button
                type="button"
                onClick={handleCheckBalance}
                disabled={isLoading}
                className="premium-cta mt-4 w-full rounded-xl px-5 py-3 text-sm font-bold uppercase tracking-[0.13em] text-slate-900 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? 'Checking...' : 'Check Balance'}
              </button>

              <div
                className={`mt-4 min-h-24 rounded-xl border px-4 py-3 text-sm ${
                  messageType === 'success'
                    ? 'border-emerald-300/40 bg-emerald-500/10 text-emerald-100'
                    : messageType === 'error'
                      ? 'border-rose-300/35 bg-rose-500/10 text-rose-100'
                      : 'border-white/12 bg-white/5 text-slate-200'
                }`}
              >
                {message || 'Use this control to fetch your latest secured account balance.'}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                Recent Activity
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="activity-row">
                  <span>ATM Withdrawal</span>
                  <span className="text-rose-300">- ₹2,000</span>
                </li>
                <li className="activity-row">
                  <span>Salary Credit</span>
                  <span className="text-emerald-300">+ ₹85,000</span>
                </li>
                <li className="activity-row">
                  <span>UPI Payment</span>
                  <span className="text-rose-300">- ₹1,250</span>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
