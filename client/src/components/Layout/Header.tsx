import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-gray-900/10 backdrop-blur-3xl border-b border-white/20 dark:border-gray-800/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <i className="bi bi-film text-white text-2xl"></i>
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold gradient-text font-['Playfair_Display']">
                CinePulse
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Premium Movie Collection</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="relative text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 font-semibold group"
            >
              <span>Home</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link 
              to="/movies" 
              className="relative text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 font-semibold group"
            >
              <span>Movies</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link 
              to="/search" 
              className="relative text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 font-semibold group"
            >
              <span>Browse</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden sm:block">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 px-6 py-3 pl-12 pr-4 text-sm border border-white/20 dark:border-gray-600/20 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-transparent bg-white/10 dark:bg-gray-800/10 text-gray-900 dark:text-gray-100 backdrop-blur-xl placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                />
                <i className="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300"></i>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              </div>
            </form>

            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-white/10 dark:bg-gray-800/10 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transform hover:scale-110"
              aria-label="Toggle theme"
            >
              <i className={`bi ${isDark ? 'bi-sun-fill' : 'bi-moon-fill'} text-gray-700 dark:text-gray-300 text-lg`}></i>
            </button>

            <button
              onClick={toggleMenu}
              className="md:hidden p-3 rounded-2xl bg-white/10 dark:bg-gray-800/10 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transform hover:scale-110"
              aria-label="Toggle menu"
            >
              <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'} text-gray-700 dark:text-gray-300 text-lg`}></i>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/20 dark:border-gray-700/20 backdrop-blur-xl">
            <div className="flex flex-col space-y-6">
              <form onSubmit={handleSearch} className="sm:hidden">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-3 pl-12 pr-4 text-sm border border-white/20 dark:border-gray-600/20 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-transparent bg-white/10 dark:bg-gray-800/10 text-gray-900 dark:text-gray-100 backdrop-blur-xl placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <i className="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </form>
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 font-semibold text-lg"
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 font-semibold text-lg"
              >
                Movies
              </Link>
              <Link 
                to="/search" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 font-semibold text-lg"
              >
                Browse
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
