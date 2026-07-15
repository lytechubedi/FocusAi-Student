import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  email: '',

  initAuth: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    set({ user: session?.user || null, loading: false })
  },

  signIn: async (email) => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (!error) set({ email })
    return { error }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, email: '' })
  },
}))
