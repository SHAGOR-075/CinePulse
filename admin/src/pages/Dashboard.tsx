import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { movieApi } from '../services/api'

const Dashboard: React.FC = () => {
  const { data: movies, isLoading } = useQuery('movies', movieApi.getMovies)

  const stats = {
    totalMovies: movies?.length || 0,
    categories: [...new Set(movies?.map(movie => movie.category) || [])].length,
    recentMovies: movies?.slice(0, 5) || [],
  }

  const StatCard: React.FC<{
    title: string
    value: string | number
    icon: string
    gradient: string
    bgGradient: string
  }> = ({ title, value, icon, gradient, bgGradient }) => (
    <div className={`bg-gradient-to-br ${bgGradient} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">
            {isLoading ? '...' : value}
          </p>
        </div>
        <div className={`bg-gradient-to-r ${gradient} p-4 rounded-2xl shadow-lg`}>
          <i className={`bi ${icon} text-white text-2xl`}></i>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your movie collection.
          </p>
        </div>
        <Link 
          to="/movies/add" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <i className="bi bi-plus-circle-fill"></i>
          <span>Add Movie</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Movies"
          value={stats.totalMovies}
          icon="bi-collection-play-fill"
          gradient="from-blue-400 to-blue-600"
          bgGradient="from-blue-500 to-blue-700"
        />
        <StatCard
          title="Categories"
          value={stats.categories}
          icon="bi-tags-fill"
          gradient="from-green-400 to-green-600"
          bgGradient="from-green-500 to-green-700"
        />
        <StatCard
          title="This Month"
          value={stats.totalMovies}
          icon="bi-calendar-check-fill"
          gradient="from-purple-400 to-purple-600"
          bgGradient="from-purple-500 to-purple-700"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/movies/add"
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 dark:border-gray-700/50 group"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <i className="bi bi-plus-circle-fill text-white text-2xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Movie</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Upload a new movie to your collection</p>
            </div>
          </div>
        </Link>

        <Link
          to="/movies"
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 dark:border-gray-700/50 group"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <i className="bi bi-collection-play-fill text-white text-2xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Movies</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">View and edit your movie collection</p>
            </div>
          </div>
        </Link>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg">
              <i className="bi bi-graph-up-arrow text-white text-2xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">View detailed statistics and insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Movies */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Recent Movies
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Latest additions to your collection
              </p>
            </div>
            <Link 
              to="/movies" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center space-x-1 hover:underline"
            >
              <span>View All</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse flex items-center space-x-4">
                  <div className="bg-gray-300 dark:bg-gray-700 h-20 w-32 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : stats.recentMovies.length > 0 ? (
            <div className="space-y-4">
              {stats.recentMovies.map((movie) => (
                <div key={movie._id} className="flex items-center space-x-4 p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-all duration-200 group">
                  <img
                    src={movie.poster || `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=100&h=150&fit=crop&crop=center`}
                    alt={movie.title}
                    className="w-20 h-28 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-200"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://placehold.co/100x150/1f2937/ffffff?text=Movie'
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                      {movie.title}
                    </h3>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {movie.category}
                      </span>
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {movie.quality}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
                        <i className="bi bi-hdd mr-1"></i>
                        {movie.size}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Added {new Date(movie.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/movies/edit/${movie._id}`}
                      className="p-3 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-all duration-200 transform hover:scale-110"
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gradient-to-r from-gray-400 to-gray-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-collection-play text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No movies yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start building your collection by adding your first movie!
              </p>
              <Link
                to="/movies/add"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
              >
                <i className="bi bi-plus-circle-fill"></i>
                <span>Add Your First Movie</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
