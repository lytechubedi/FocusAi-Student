import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const signInWithEmail = async (email) => {
  const { data, error } = await supabase.auth.signInWithOtp({ email })
  return { data, error }
}

export const signOut = async () => {
  return await supabase.auth.signOut()
}

export const savePomodoroSession = async (userId, duration) => {
  const { data, error } = await supabase
    .from('pomodoro_sessions')
    .insert([{ user_id: userId, duration, completed: true }])
  return { data, error }
}

export const getUserSessions = async (userId) => {
  const { data, error } = await supabase
    .from('pomodoro_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}
