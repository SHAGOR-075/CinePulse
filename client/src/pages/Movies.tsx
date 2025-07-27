import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import { movieApi } from '../services/api'
import MovieGrid from '../components/Movie/MovieGrid'
import FilterBar from '../components/UI/FilterBar'

const Movies: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedQuality, setSelectedQuality] = useState('')

  const { data: movies, isLoading } = useQuery(
    ['movies', selectedCategory, selectedQuality],
    () => movieApi.getMovies({
      category: selectedCategory || undefined,
      quality: selectedQuality || undefined,
    }),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  )

  const categories = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Adventure']
  const qualities = ['720p', '1080p', '4K', 'HD', 'CAM']

  return (
    <>
      <Helmet>
        <title>All Movies - CinePulse</title>
        <meta name="description" content="Browse and download all movies available on MovieShuttle. Filter by category and quality." />
        <meta name="keywords" content="movies, download, browse movies, filter movies, HD movies" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              All Movies
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Browse and download from our extensive collection of movies
            </p>
          </div>

          <FilterBar
            categories={categories}
            qualities={qualities}
            selectedCategory={selectedCategory}
            selectedQuality={selectedQuality}
            onCategoryChange={setSelectedCategory}
            onQualityChange={setSelectedQuality}
          />

          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              {isLoading ? 'Loading...' : `Showing ${movies?.length || 0} movies`}
            </p>
          </div>

          <MovieGrid movies={movies || []} loading={isLoading} />
        </div>
      </div>
    </>
  )
}

export default Movies
