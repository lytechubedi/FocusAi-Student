'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { usePomodoroStore } from '@/store/pomodoroStore'

export default function StatsView() {
  const user = useAuthStore((state) => state.user)
  const sessions = usePomodoroStore((state) => state.sessions)
  const loadSessions = usePomodoroStore((state) => state.loadSessions)
  const getStats = usePomodoroStore((state) => state.getStats)

  useEffect(() => {
    if (user) loadSessions(user.id)
  }, [user, loadSessions])

  const stats = getStats()

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    date.setHours(0, 0, 0, 0)
    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)

    const daySessions = sessions.filter((s) => {
      const sDate = new Date(s.created_at)
      return sDate >= date && sDate < nextDate
    })

    return {
      day: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
      minutes: daySessions.reduce((sum, s) => sum + (s.duration || 0), 0),
    }
  })

  const maxMinutes = Math.max(...last7Days.map((d) => d.minutes), 25)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Tes Progrès</h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <p className="text-gray-400 text-sm mb-1">Total Sessions</p>
          <p className="text-3xl font-bold text-white">{stats.totalSessions}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <p className="text-gray-400 text-sm mb-1">Total Minutes</p>
          <p className="text-3xl font-bold text-white">{stats.totalMinutes}</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <p className="text-gray-400 text-sm mb-4">7 derniers jours</p>
        <div className="flex items-end justify-between gap-2 h-32">
          {last7Days.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-lg transition-all"
                style={{
                  height: `${Math.max((day.minutes / maxMinutes) * 100, 4)}%`,
                }}
              />
              <span className="text-xs text-gray-500">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {stats.totalSessions === 0 && (
        <div className="text-center text-gray-500 mt-8">
          Commence ta première session pour voir tes stats ici 📊
        </div>
      )}
    </div>
  )
}
