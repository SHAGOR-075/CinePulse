import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { movieApi } from '../services/api'
import toast from 'react-hot-toast'

const Movies: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: movies, isLoading, error } = useQuery('movies', movieApi.getMovies, {
    retry: 3,
    retryDelay: 1000,
  })

  const deleteMutation = useMutation(movieApi.deleteMovie, {
    onSuccess: () => {
      queryClient.invalidateQueries('movies')
      toast.success('🎬 Movie deleted successfully!')
      setShowDeleteModal(null)
    },
    onError: (error: any) => {
      console.error('Delete error:', error)
      toast.error('❌ Failed to delete movie. Please try again.')
    },
  })

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  const DeleteModal: React.FC<{ movieId: string; movieTitle: string }> = ({ movieId, movieTitle }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/20 dark:border-gray-700/20">
        <div className="flex items-center mb-6">
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-2xl mr-4">
            <i className="bi bi-exclamation-triangle-fill text-red-500 text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Delete Movie
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-white">"{movieTitle}"</span>? This action cannot be undone and will permanently remove the movie from your collection.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowDeleteModal(null)}
            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(movieId)}
            disabled={deleteMutation.isLoading}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {deleteMutation.isLoading ? (
              <>
                <i className="bi bi-arrow-clockwise animate-spin"></i>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <i className="bi bi-trash-fill"></i>
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="bg-red-100 dark:bg-red-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="bi bi-exclamation-triangle-fill text-red-500 text-3xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Movies
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There was an error loading the movies. Please check your connection and try again.
          </p>
          <button
            onClick={() => queryClient.invalidateQueries('movies')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
            Movie Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your movie library with ease
          </p>
        </div>
        <Link 
          to="/movies/add" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
        >
          <i className="bi bi-plus-circle-fill text-xl"></i>
          <span>Add New Movie</span>
        </Link>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
        {isLoading ? (
          <div className="p-8">
            <div className="animate-pulse space-y-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className="bg-gray-300 dark:bg-gray-700 h-24 w-16 rounded-xl"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-3/4"></div>
                    <div className="flex space-x-4">
                      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-20"></div>
                      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : movies && movies.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Movie Details
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Category & Quality
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Statistics
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Added Date
                  </th>
                  <th className="px-8 py-6 text-right text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                {movies.map((movie, index) => (
                  <tr key={movie._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-300 group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={movie.poster || `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=80&h=120&fit=crop&crop=center`}
                            alt={movie.title}
                            className="w-16 h-24 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                            crossOrigin="anonymous"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = 'https://placehold.co/80x120/1f2937/ffffff?text=Movie'
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                            {movie.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                            {movie.description.substring(0, 100)}...
                          </p>
                          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-500">
                            <i className="bi bi-hdd-fill mr-1"></i>
                            <span>{movie.size}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          {movie.category}
                        </span>
                        <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg ml-2">
                          {movie.quality}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <i className="bi bi-eye-fill mr-2 text-blue-500"></i>
                          <span>{movie.views || 0} views</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <i className="bi bi-download mr-2 text-green-500"></i>
                          <span>{movie.downloads || 0} downloads</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(movie.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end space-x-3">
                        <Link
                          to={`/movies/edit/${movie._id}`}
                          className="bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50 text-blue-600 dark:text-blue-400 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                          title="Edit Movie"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </Link>
                        <button
                          onClick={() => setShowDeleteModal(movie._id)}
                          className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800/50 text-red-600 dark:text-red-400 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                          title="Delete Movie"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-gray-400 to-gray-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <i className="bi bi-collection-play text-white text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Movies Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Your movie collection is empty. Start building your library by adding your first movie!
            </p>
            <Link 
              to="/movies/add" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-3"
            >
              <i className="bi bi-plus-circle-fill text-xl"></i>
              <span>Add Your First Movie</span>
            </Link>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <DeleteModal
          movieId={showDeleteModal}
          movieTitle={movies?.find(m => m._id === showDeleteModal)?.title || ''}
        />
      )}
    </div>
  )
}

export default Movies
