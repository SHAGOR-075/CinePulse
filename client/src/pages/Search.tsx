import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import { movieApi } from '../services/api'
import MovieGrid from '../components/Movie/MovieGrid'

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

  const { data: movies, isLoading } = useQuery(
    ['searchMovies', searchQuery],
    () => movieApi.getMovies({ search: searchQuery }),
    {
      enabled: !!searchQuery,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  )

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() })
    }
  }

  return (
    <>
      <Helmet>
        <title>{searchQuery ? `Search: ${searchQuery}` : 'Search Movies'} - CinePulse</title>
        <meta name="description" content={`Search for movies on MovieShuttle. ${searchQuery ? `Results for: ${searchQuery}` : 'Find your favorite movies.'}`} />
        <meta name="keywords" content="search movies, find movies, movie search, MovieShuttle search" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Search Movies
            </h1>
            
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 pr-4 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <i className="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary px-6 py-2"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {searchQuery && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {isLoading ? 'Searching...' : `Found ${movies?.length || 0} movies`}
                </p>
              </div>

              <MovieGrid movies={movies || []} loading={isLoading} />
            </>
          )}

          {!searchQuery && (
            <div className="text-center py-12">
              <i className="bi bi-search text-6xl text-gray-400 dark:text-gray-600 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Start Searching
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter a movie title to search our extensive collection
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Search
