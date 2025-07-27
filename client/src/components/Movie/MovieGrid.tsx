import React from 'react'
import { Movie } from '../../types/movie'
import MovieCard from './MovieCard'
import LoadingSkeleton from '../UI/LoadingSkeleton'

interface MovieGridProps {
  movies: Movie[]
  loading?: boolean
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies = [], loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="bi bi-film text-6xl text-gray-400 dark:text-gray-600 mb-4"></i>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No movies found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search or filter criteria
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieGrid
