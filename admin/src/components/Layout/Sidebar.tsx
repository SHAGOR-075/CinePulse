import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar: React.FC = () => {
  const location = useLocation()

  const menuItems = [
    {
      path: '/dashboard',
      icon: 'bi-speedometer2',
      label: 'Dashboard',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      path: '/movies',
      icon: 'bi-collection-play-fill',
      label: 'Movies',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      path: '/movies/add',
      icon: 'bi-plus-circle-fill',
      label: 'Add Movie',
      gradient: 'from-green-500 to-emerald-500'
    },
  ]

  return (
    <aside className="w-72 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 dark:border-gray-700/50 min-h-screen">
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <Link to="/dashboard" className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
            <i className="bi bi-film text-white text-2xl"></i>
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CinePulse
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="mt-8 px-4">
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 group ${
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 hover:shadow-md'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${
                    isActive 
                      ? 'bg-white/20' 
                      : `bg-gradient-to-r ${item.gradient} text-white shadow-md group-hover:shadow-lg`
                  }`}>
                    <i className={`bi ${item.icon} text-lg ${isActive ? 'text-white' : ''}`}></i>
                  </div>
                  <span className="font-semibold">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <i className="bi bi-lightning-fill text-white text-xl"></i>
            </div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
              Powered by
            </p>
            <p className="text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shagor TechForge IT
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
