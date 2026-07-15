import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const usePomodoroStore = create((set, get) => ({
  sessions: [],
  todaySessions: [],
  loading: false,

  loadSessions: async (userId) => {
    set({ loading: true })
    const { data } = await supabase
      .from('pomodoro_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(100)
    set({ sessions: data || [], loading: false })
  },

  loadTodaySessions: async (userId) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { data } = await supabase
      .from('pomodoro_sessions')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', today.toISOString())
      .order('created_at', { ascending: false })

    set({ todaySessions: data || [] })
  },

  addSession: async (userId, duration) => {
    const { data, error } = await supabase
      .from('pomodoro_sessions')
      .insert([{ user_id: userId, duration, completed: true }])
      .select()

    if (!error) {
      const { sessions } = get()
      set({ sessions: [data[0], ...sessions] })
      await get().loadTodaySessions(userId)
    }
    return { error }
  },

  getStats: () => {
    const { sessions, todaySessions } = get()
    return {
      totalSessions: sessions.length,
      totalMinutes: sessions.reduce((sum, s) => sum + (s.duration || 0), 0),
      todaySessions: todaySessions.length,
      todayMinutes: todaySessions.reduce((sum, s) => sum + (s.duration || 0), 0),
    }
  },
}))
