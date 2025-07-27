import React from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '../../types/movie'
import { useInView } from 'react-intersection-observer'
import toast from 'react-hot-toast'

interface MovieCardProps {
  movie: Movie
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (movie.downloadLink) {
      toast.success('🎬 Download started! Enjoy your movie!', {
        style: {
          background: 'rgba(16, 185, 129, 0.1)',
          backdropFilter: 'blur(20px)',
          color: 'white',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        },
      })
      window.open(movie.downloadLink, '_blank')
    } else {
      toast.error('❌ Download link not available', {
        style: {
          background: 'rgba(239, 68, 68, 0.1)',
          backdropFilter: 'blur(20px)',
          color: 'white',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        },
      })
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Action': 'from-red-500 to-orange-500',
      'Comedy': 'from-yellow-500 to-orange-500',
      'Drama': 'from-blue-500 to-indigo-500',
      'Horror': 'from-gray-800 to-red-900',
      'Sci-Fi': 'from-cyan-500 to-blue-500',
      'Thriller': 'from-purple-500 to-pink-500',
      'Romance': 'from-pink-500 to-rose-500',
      'Adventure': 'from-green-500 to-teal-500',
    }
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  const getQualityColor = (quality: string) => {
    const colors = {
      '4K': 'from-purple-600 to-pink-600',
      '1080p': 'from-blue-600 to-indigo-600',
      '720p': 'from-green-600 to-teal-600',
      'HD': 'from-indigo-600 to-purple-600',
      'CAM': 'from-gray-600 to-gray-700',
    }
    return colors[quality as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  return (
    <div
      ref={ref}
      className={`movie-card group ${
        inView ? 'animate-fade-in' : 'opacity-0'
      }`}
    >
      <Link to={`/movies/${movie._id}`} className="block">
        <div className="relative overflow-hidden rounded-t-3xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
          <img
            src={movie.poster || `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop&crop=center`}
            alt={movie.title}
            className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110"
            crossOrigin="anonymous"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://placehold.co/400x600/1f2937/ffffff?text=Movie+Poster'
            }}
          />
          
          {/* Overlay with play button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center z-20">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
              <div className="bg-white/20 backdrop-blur-xl rounded-full p-6 border border-white/30 shadow-2xl pulse-glow">
                <i className="bi bi-play-fill text-white text-4xl ml-1"></i>
              </div>
            </div>
          </div>
          
          {/* Quality badge */}
          <div className="absolute top-4 right-4 z-30">
            <span className={`bg-gradient-to-r ${getQualityColor(movie.quality)} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20`}>
              {movie.quality}
            </span>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-30">
            <span className={`bg-gradient-to-r ${getCategoryColor(movie.category)} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20`}>
              {movie.category}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 font-['Playfair_Display']">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span className="flex items-center bg-gray-100/80 dark:bg-gray-800/80 px-3 py-2 rounded-xl backdrop-blur-sm">
              <i className="bi bi-hdd-fill mr-2 text-purple-500"></i>
              {movie.size}
            </span>
            <span className="flex items-center bg-gray-100/80 dark:bg-gray-800/80 px-3 py-2 rounded-xl backdrop-blur-sm">
              <i className="bi bi-eye-fill mr-2 text-blue-500"></i>
              {movie.views || 0}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
            {movie.description}
          </p>

          <button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group"
          >
            <i className="bi bi-download text-lg group-hover:animate-bounce"></i>
            <span>Download Now</span>
            <i className="bi bi-arrow-right text-lg group-hover:translate-x-1 transition-transform duration-300"></i>
          </button>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard
