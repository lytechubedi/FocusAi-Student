'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const signIn = useAuthStore((state) => state.signIn)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await signIn(email)

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('✓ Check your email for the magic link!')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md dark:bg-gray-800/50 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            FocusAI
          </h1>
          <p className="text-gray-400">Study smarter, not harder</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Get Magic Link'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
            message.includes('Error') 
              ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
              : 'bg-green-500/20 text-green-400 border border-green-500/50'
          }`}>
            {message}
          </div>
        )}

        <p className="text-xs text-center text-gray-500 mt-6">
          Built by a student 🚀 for African students
        </p>
      </div>
    </div>
  )
}
