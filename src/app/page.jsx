'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { usePomodoroStore } from '../store/pomodoroStore'
import Timer from '../components/Timer'
import Login from '../components/Login'
import Navigation from '../components/Navigation'
import StatsView from '../components/StatsView'
import AICoach from '../components/AICoach'

export default function Home() {
  const [activeView, setActiveView] = useState('timer')
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)
  const initAuth = useAuthStore((state) => state.initAuth)
  const loadTodaySessions = usePomodoroStore((state) => state.loadTodaySessions)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (user) {
      loadTodaySessions(user.id)
    }
  }, [user, loadTodaySessions])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
        <div className="text-white text-xl animate-pulse">Chargement...</div>
      </div>
    )
  }

  if (!user) return <Login />

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      {activeView === 'timer' && <Timer />}
      {activeView === 'stats' && <StatsView />}
      {activeView === 'coach' && <AICoach />}
    </div>
  )
}
