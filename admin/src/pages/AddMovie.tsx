import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { movieApi } from '../services/api'
import { CreateMovieData } from '../types/movie'
import toast from 'react-hot-toast'

const AddMovie: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CreateMovieData>()

  const createMutation = useMutation(movieApi.createMovie, {
    onSuccess: () => {
      queryClient.invalidateQueries('movies')
      toast.success('🎬 Movie added successfully!')
      navigate('/movies')
    },
    onError: (error: any) => {
      console.error('Create error:', error)
      toast.error('❌ Failed to add movie. Please check all fields and try again.')
    },
  })

  const onSubmit = (data: CreateMovieData) => {
    console.log('Submitting movie data:', data)
    createMutation.mutate(data)
  }

  const categories = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Adventure']
  const qualities = ['720p', '1080p', '4K', 'HD', 'CAM']

  const posterUrl = watch('poster')

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/movies')}
          className="p-3 rounded-2xl bg-white/10 dark:bg-gray-800/10 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transform hover:scale-110"
        >
          <i className="bi bi-arrow-left text-gray-700 dark:text-gray-300 text-lg"></i>
        </button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
            Add New Movie
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add a new movie to your collection
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-6 sticky top-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Movie Preview</h3>
            <div className="space-y-4">
              <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt="Movie poster preview"
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://placehold.co/400x600/1f2937/ffffff?text=Movie+Poster'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <i className="bi bi-image text-4xl text-gray-400 mb-2"></i>
                      <p className="text-gray-500 text-sm">Poster Preview</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enter a poster URL to see the preview
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Form */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Movie Title *
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className="w-full px-6 py-4 border border-gray-300/30 dark:border-gray-600/30 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 transition-all duration-300 backdrop-blur-sm shadow-lg placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter the movie title"
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <i className="bi bi-exclamation-circle-fill mr-1"></i>
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Category *
                  </label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-6 py-4 border border-gray-300/30 dark:border-gray-600/30 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 transition-all duration-300 backdrop-blur-sm shadow-lg"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <i className="bi bi-exclamation-circle-fill mr-1"></i>
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Quality *
                  </label>
                  <select
                    {...register('quality', { required: 'Quality is required' })}
                    className="w-full px-6 py-4 border border-gray-300/30 dark:border-gray-600/30 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 transition-all duration-300 backdrop-blur-sm shadow-lg"
                  >
                    <option value="">Select quality</option>
                    {qualities.map((quality) => (
                      <option key={quality} value={quality}>
                        {quality}
                      </option>
                    ))}
                  </select>
                  {errors.quality && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <i className="bi bi-exclamation-circle-fill mr-1"></i>
                      {errors.quality.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    File Size *
                  </label>
                  <input
                    type="text"
                    {...register('size', { required: 'Size is required' })}
                    className="w-full px-6 py-4 border border-gray-300/30 dark:border-gray-600/30 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 transition-all duration-300 backdrop-blur-sm shadow-lg placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="e.g., 2.5 GB"
                  />
                  {errors.size && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <i className="bi bi-exclamation-circle-fill mr-1"></i>
                      {errors.size.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Download Link *
                  </label>
                  <input
                    type="url"
                    {...register('downloadLink', { required: 'Download link is required' })}
                    className="w-full px-6 py-4 border border-gray-300/30 dark:border-gray-600/30 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 transition-all duration-300 backdrop-blur-sm shadow-lg placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="https://example.com/download/movie.mp4"
                  />
                  {errors.downloadLink && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <i className="bi bi-exclamation-circle-fill mr-1"></i>
                      {errors.downloadLink.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Poster URL *
                  </label>
                  <input
                    type="url"
                    {...register('poster', { required: 'Poster URL is required' })}
                    className="w-full px-6 py-4 border border-gray-300/30 dark:border-gray-600/30 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 transition-all duration-300 backdrop-blur-sm shadow-lg placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="https://example.com/poster.jpg"
                  />
                  {errors.poster && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <i className="bi bi-exclamation-circle-fill mr-1"></i>
                      {errors.poster.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                  Description *
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows={6}
                  className="w-full px-6 py-4 border border-gray-300/30 dark:border-gray-600/30 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 transition-all duration-300 backdrop-blur-sm shadow-lg placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  placeholder="Enter a detailed description of the movie..."
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <i className="bi bi-exclamation-circle-fill mr-1"></i>
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/movies')}
                  className="flex-1 bg-white/10 dark:bg-gray-800/20 hover:bg-white/20 dark:hover:bg-gray-700/30 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {createMutation.isLoading ? (
                    <>
                      <i className="bi bi-arrow-clockwise animate-spin text-xl"></i>
                      <span>Adding Movie...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-plus-circle-fill text-xl"></i>
                      <span>Add Movie</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddMovie
