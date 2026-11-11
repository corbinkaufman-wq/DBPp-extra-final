import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getCurrentUser, loginUser } from '../services/authService'
import type { User } from '../types'

type AuthValues = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthValues | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      if (!localStorage.getItem('token')) {
        setLoading(false)
        return
      }

      try {
        const data = await getCurrentUser()
        setUser(data)
      } catch {
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    const token = await loginUser(email, password)
    localStorage.setItem('token', token)

    const data = await getCurrentUser()
    setUser(data)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return context
}
