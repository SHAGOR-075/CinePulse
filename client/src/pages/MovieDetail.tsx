import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import { movieApi } from '../services/api'
import toast from 'react-hot-toast'

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  
  const { data: movie, isLoading, error } = useQuery(
    ['movie', id],
    () => movieApi.getMovie(id!),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  )

  const handleDownload = () => {
    if (movie?.downloadLink) {
      toast.success('Download started!')
      window.open(movie.downloadLink, '_blank')
    } else {
      toast.error('Download link not available')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 h-96 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <i className="bi bi-exclamation-triangle text-6xl text-red-500 mb-4"></i>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Movie Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The movie you are looking for does not exist or has been removed.
          </p>
          <Link to="/movies" className="btn-primary">
            Browse Movies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{movie.title} - CinePulse</title>
        <meta name="description" content={movie.description} />
        <meta name="keywords" content={`${movie.title}, ${movie.category}, download movie, ${movie.quality}`} />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <Link 
              to="/movies" 
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
            >
              <i className="bi bi-arrow-left mr-2"></i>
              Back to Movies
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="card overflow-hidden">
                <img
                  src={movie.poster || `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop&crop=center`}
                  alt={movie.title}
                  className="w-full h-96 object-cover"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://placehold.co/400x600/1f2937/ffffff?text=Movie+Poster'
                  }}
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="card p-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm font-medium">
                    {movie.category}
                  </span>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                    {movie.quality}
                  </span>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <i className="bi bi-hdd mr-1"></i>
                    {movie.size}
                  </span>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Description
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {movie.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Movie Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <i className="bi bi-calendar text-gray-400 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-400">
                        Added: {new Date(movie.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="bi bi-tag text-gray-400 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-400">
                        Category: {movie.category}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="bi bi-badge-hd text-gray-400 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-400">
                        Quality: {movie.quality}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="bi bi-hdd text-gray-400 mr-2"></i>
                      <span className="text-gray-600 dark:text-gray-400">
                        Size: {movie.size}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full btn-primary flex items-center justify-center space-x-2 text-lg py-4"
                >
                  <i className="bi bi-download"></i>
                  <span>Download Movie</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieDetail
