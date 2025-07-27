import React from 'react'

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 h-64 sm:h-72"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="flex justify-between mb-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
        </div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  )
}

export default LoadingSkeleton
