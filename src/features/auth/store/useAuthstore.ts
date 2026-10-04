import { createClient } from '@/lib/supabase/client';
import { create } from 'zustand'
import { persist } from "zustand/middleware"

export interface AuthUser {
    id: string;
    email: string;
    name: string;
}

interface AuthInterface {
    user: AuthUser | null,
    token: string | null,
    login: (user: AuthUser, token: string) => Promise<void>,
    logout: () => Promise<void>,
    setUser: (user: AuthUser | null, token: string | null) => void
}

export const useAuthStore = create<AuthInterface>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: async (user: AuthUser, token: string) => {
                set({ user, token })
            },
            setUser: (user, token) => set({ user, token }),
            logout: async () => {
                try {
                    const supabase = await createClient();
                    await supabase.auth.signOut();
                } catch (error) {
                    console.log('supabase error logout', error)
                } finally {
                    set({ user: null, token: null })
                }
            },
        }), {
        name: "auth-storage",
    })
)