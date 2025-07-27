import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - CinePulse</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <i className="bi bi-exclamation-triangle text-8xl text-primary-600 dark:text-primary-400 mb-4"></i>
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>

          <div className="space-y-4">
            <Link to="/" className="btn-primary w-full flex items-center justify-center">
              <i className="bi bi-house mr-2"></i>
              Go Home
            </Link>
            <Link to="/movies" className="btn-secondary w-full flex items-center justify-center">
              <i className="bi bi-collection-play mr-2"></i>
              Browse Movies
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
