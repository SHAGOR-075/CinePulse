import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import { movieApi } from '../services/api'
import MovieGrid from '../components/Movie/MovieGrid'

const Home: React.FC = () => {
  const { data: featuredMovies, isLoading: featuredLoading } = useQuery(
    'featuredMovies',
    movieApi.getFeaturedMovies,
    {
      staleTime: 5 * 60 * 1000,
    }
  )

  const { data: latestMovies, isLoading: latestLoading } = useQuery(
    'latestMovies',
    movieApi.getLatestMovies,
    {
      staleTime: 5 * 60 * 1000,
    }
  )

  return (
    <>
      <Helmet>
        <title>CinePulse - Premium Movie Collection | Download Latest Movies in 4K</title>
        <meta name="description" content="Discover and download the latest blockbuster movies in stunning 4K quality. Your premium destination for cinema entertainment." />
        <meta name="keywords" content="movies, download, 4K, premium movies, cinema, entertainment, blockbusters" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-pink-900/90"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-['Playfair_Display'] leading-tight">
                <span className="block">Welcome to</span>
                <span className="block gradient-text text-shadow">CinePulse</span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
              Your premium destination for the latest blockbuster movies in stunning 
              <span className="font-bold gradient-text"> 4K quality</span>. 
              Discover, stream, and download from our curated collection of cinematic masterpieces.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link 
                to="/movies" 
                className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-12 py-6 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <i className="bi bi-collection-play text-2xl"></i>
                  <span>Explore Collection</span>
                  <i className="bi bi-arrow-right text-xl group-hover:translate-x-2 transition-transform duration-300"></i>
                </div>
              </Link>
              
              <Link 
                to="/search" 
                className="group bg-white/10 hover:bg-white/20 text-white px-12 py-6 rounded-2xl font-bold text-lg backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <i className="bi bi-search text-2xl"></i>
                  <span>Search Movies</span>
                </div>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
              <div className="glass-card p-8 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">1000+</div>
                <div className="text-gray-300 font-medium">Premium Movies</div>
              </div>
              <div className="glass-card p-8 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">4K</div>
                <div className="text-gray-300 font-medium">Ultra HD Quality</div>
              </div>
              <div className="glass-card p-8 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
                <div className="text-gray-300 font-medium">Always Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Playfair_Display']">
              Featured <span className="gradient-text">Movies</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Handpicked selection of the most popular and critically acclaimed movies
            </p>
          </div>
          <MovieGrid movies={featuredMovies || []} loading={featuredLoading} />
          <div className="text-center mt-12">
            <Link 
              to="/movies" 
              className="inline-flex items-center space-x-3 text-purple-400 hover:text-purple-300 font-semibold text-lg group transition-colors duration-300"
            >
              <span>View All Featured Movies</span>
              <i className="bi bi-arrow-right group-hover:translate-x-2 transition-transform duration-300"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Movies */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-indigo-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Playfair_Display']">
              Latest <span className="gradient-text">Releases</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Fresh from the cinema - the newest blockbusters and indie gems
            </p>
          </div>
          <MovieGrid movies={latestMovies || []} loading={latestLoading} />
          <div className="text-center mt-12">
            <Link 
              to="/movies" 
              className="inline-flex items-center space-x-3 text-purple-400 hover:text-purple-300 font-semibold text-lg group transition-colors duration-300"
            >
              <span>Discover More Latest Movies</span>
              <i className="bi bi-arrow-right group-hover:translate-x-2 transition-transform duration-300"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 to-purple-900/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Playfair_Display']">
              Why Choose <span className="gradient-text">CinePulse</span>?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience cinema like never before with our premium features and unmatched quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-500">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <i className="bi bi-lightning-charge-fill text-white text-3xl"></i>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-['Playfair_Display']">
                Lightning Fast
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Ultra-fast download speeds with our premium CDN network. Get your movies in minutes, not hours.
              </p>
            </div>

            <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-500">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <i className="bi bi-badge-4k-fill text-white text-3xl"></i>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-['Playfair_Display']">
                4K Ultra HD
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Crystal clear 4K resolution with HDR support. Experience movies the way directors intended.
              </p>
            </div>

            <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-500">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <i className="bi bi-collection-fill text-white text-3xl"></i>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-['Playfair_Display']">
                Vast Collection
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Thousands of movies across all genres. From blockbusters to indie films, we have it all.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
