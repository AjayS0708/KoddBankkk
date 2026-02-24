import { useState } from 'react'
import axiosInstance from '../api/axios.js'

function Dashboard() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckBalance = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get('/check-balance')
      setMessage(`Your balance is ₹${response.data.balance}`)
    } catch {
      setMessage('Session expired. Please login again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-md">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">Dashboard Page</h1>
        <button
          type="button"
          onClick={handleCheckBalance}
          disabled={isLoading}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? 'Checking...' : 'Check Balance'}
        </button>
        <p className="mt-5 min-h-6 text-sm text-gray-700">{message}</p>
      </div>
    </div>
  )
}

export default Dashboard
