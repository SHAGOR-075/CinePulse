import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

interface User {
  id: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin-token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // In a real app, you would verify the token with the server
      setUser({ id: '1', email: 'admin@CinePulse.com', role: 'admin' })
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Mock login - in real app, this would be an API call
      if (email === 'admin@CinePulse.com' && password === 'admin123') {
        const mockToken = 'mock-jwt-token'
        localStorage.setItem('admin-token', mockToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`
        setUser({ id: '1', email, role: 'admin' })
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('admin-token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
