import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'

const Header: React.FC = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg">
            <i className="bi bi-speedometer2 text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              CinePulse Management Panel
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-gray-100/80 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm shadow-md hover:shadow-lg transform hover:scale-105"
            aria-label="Toggle theme"
          >
            <i className={`bi ${isDark ? 'bi-sun-fill' : 'bi-moon-fill'} text-gray-700 dark:text-gray-300 text-lg`}></i>
          </button>

          <div className="flex items-center space-x-3 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
              <i className="bi bi-person-fill text-white text-lg"></i>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {user?.email}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Administrator
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-3 rounded-xl bg-red-100/80 dark:bg-red-900/80 hover:bg-red-200 dark:hover:bg-red-800 text-red-600 dark:text-red-400 transition-all duration-200 backdrop-blur-sm shadow-md hover:shadow-lg transform hover:scale-105"
            aria-label="Logout"
          >
            <i className="bi bi-box-arrow-right text-lg"></i>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
