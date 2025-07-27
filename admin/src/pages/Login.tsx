import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import toast from 'react-hot-toast'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      toast.success('Welcome back! Login successful!')
    } catch (error) {
      toast.error('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-3xl shadow-2xl transform hover:scale-110 transition-all duration-300">
              <i className="bi bi-film text-white text-4xl"></i>
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
            CinePulse Admin
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Sign in to your admin dashboard
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 pl-12 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 transition-all duration-200 backdrop-blur-sm shadow-lg"
                  placeholder="admin@CinePulse.com"
                />
                <i className="bi bi-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 pl-12 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 transition-all duration-200 backdrop-blur-sm shadow-lg"
                  placeholder="Enter your password"
                />
                <i className="bi bi-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="bi bi-arrow-clockwise animate-spin"></i>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right"></i>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Demo Credentials
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Email: adminCinePulse.com
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Password: admin123
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={toggleTheme}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 flex items-center space-x-2 mx-auto bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl"
          >
            <i className={`bi ${isDark ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
