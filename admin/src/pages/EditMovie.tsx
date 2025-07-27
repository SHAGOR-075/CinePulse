import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { movieApi } from '../services/api'
import { UpdateMovieData } from '../types/movie'
import toast from 'react-hot-toast'

const EditMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateMovieData>()

  const { data: movie, isLoading } = useQuery(
    ['movie', id],
    () => movieApi.getMovie(id!),
    { enabled: !!id }
  )

  const updateMutation = useMutation(
    (data: UpdateMovieData) => movieApi.updateMovie(id!, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('movies')
        queryClient.invalidateQueries(['movie', id])
        toast.success('Movie updated successfully!')
        navigate('/movies')
      },
      onError: () => {
        toast.error('Failed to update movie')
      },
    }
  )

  useEffect(() => {
    if (movie) {
      reset(movie)
    }
  }, [movie, reset])

  const onSubmit = (data: UpdateMovieData) => {
    updateMutation.mutate(data)
  }

  const categories = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Adventure']
  const qualities = ['720p', '1080p', '4K', 'HD', 'CAM']

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
          <div className="card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="text-center py-12">
        <i className="bi bi-exclamation-triangle text-6xl text-red-500 mb-4"></i>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Movie Not Found
        </h1>
        <button onClick={() => navigate('/movies')} className="btn-primary">
          Back to Movies
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/movies')}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <i className="bi bi-arrow-left text-gray-700 dark:text-gray-300"></i>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Edit Movie
        </h1>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Movie Title *
              </label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="input-field"
                placeholder="Enter movie title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Poster URL *
              </label>
              <input
                type="url"
                {...register('poster', { required: 'Poster URL is required' })}
                className="input-field"
                placeholder="https://example.com/poster.jpg"
              />
              {errors.poster && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.poster.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="input-field"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quality *
              </label>
              <select
                {...register('quality', { required: 'Quality is required' })}
                className="input-field"
              >
                <option value="">Select quality</option>
                {qualities.map((quality) => (
                  <option key={quality} value={quality}>
                    {quality}
                  </option>
                ))}
              </select>
              {errors.quality && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.quality.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                File Size *
              </label>
              <input
                type="text"
                {...register('size', { required: 'Size is required' })}
                className="input-field"
                placeholder="e.g., 1.2 GB"
              />
              {errors.size && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.size.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Download Link *
              </label>
              <input
                type="url"
                {...register('downloadLink', { required: 'Download link is required' })}
                className="input-field"
                placeholder="https://example.com/download/movie.mp4"
              />
              {errors.downloadLink && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.downloadLink.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className="input-field"
              placeholder="Enter movie description..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/movies')}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isLoading}
              className="btn-primary flex-1"
            >
              {updateMutation.isLoading ? (
                <>
                  <i className="bi bi-arrow-clockwise animate-spin mr-2"></i>
                  Updating Movie...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle mr-2"></i>
                  Update Movie
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditMovie
