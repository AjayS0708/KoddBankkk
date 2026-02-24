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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-8 md:px-8">
      {showConfetti ? (
        <Confetti width={windowSize.width} height={windowSize.height} />
      ) : null}

      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
              KodBank Classic
            </p>
            <h1 className="font-display mt-1 text-3xl text-slate-800">
              Banking Dashboard
            </h1>
          </div>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 md:mt-0">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Today</p>
            <p className="text-sm font-semibold text-slate-700">{currentDate}</p>
          </div>
        </header>

        <main className="grid gap-6 xl:grid-cols-12">
          <section className="space-y-6 xl:col-span-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Primary Card
              </p>
              <div className="mt-4 rounded-3xl border border-blue-300 bg-gradient-to-br from-blue-700 to-indigo-700 p-6 text-white shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold tracking-wide">KODBANK PLATINUM</p>
                  <div className="h-8 w-12 rounded-md border border-white/60 bg-white/30" />
                </div>
                <p className="mt-8 text-2xl tracking-[0.18em]">4387 2026 9090 7761</p>
                <div className="mt-8 flex justify-between text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-blue-100">
                      Card Holder
                    </p>
                    <p className="font-semibold">AJAY SHARMA</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-blue-100">
                      Expires
                    </p>
                    <p className="font-semibold">12/30</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  Available Balance
                </p>
                <p className="font-display mt-3 text-3xl text-slate-800">
                  {balance !== null ? `₹${balance}` : '₹ --'}
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  Monthly Spend
                </p>
                <p className="font-display mt-3 text-3xl text-slate-800">₹28,450</p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  Rewards Points
                </p>
                <p className="font-display mt-3 text-3xl text-slate-800">12,760</p>
              </article>
            </div>
          </section>

          <section className="space-y-6 xl:col-span-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Quick Action
              </p>
              <button
                type="button"
                onClick={handleCheckBalance}
                disabled={isLoading}
                className="mt-4 w-full rounded-xl bg-slate-800 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? 'Checking...' : 'Check Balance'}
              </button>

              <div
                className={`mt-4 min-h-24 rounded-xl border px-4 py-3 text-sm ${
                  messageType === 'success'
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    : messageType === 'error'
                      ? 'border-rose-300 bg-rose-50 text-rose-700'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                {message || 'Click check balance to fetch your latest account balance.'}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Recent Activity
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <span>ATM Withdrawal</span>
                  <span className="font-semibold text-rose-600">- ₹2,000</span>
                </li>
                <li className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <span>Salary Credit</span>
                  <span className="font-semibold text-emerald-600">+ ₹85,000</span>
                </li>
                <li className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <span>UPI Payment</span>
                  <span className="font-semibold text-rose-600">- ₹1,250</span>
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
