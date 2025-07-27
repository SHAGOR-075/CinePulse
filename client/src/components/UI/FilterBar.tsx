import React from 'react'

interface FilterBarProps {
  categories: string[]
  qualities: string[]
  selectedCategory: string
  selectedQuality: string
  onCategoryChange: (category: string) => void
  onQualityChange: (quality: string) => void
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  qualities,
  selectedCategory,
  selectedQuality,
  onCategoryChange,
  onQualityChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Filter Movies
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quality
          </label>
          <select
            value={selectedQuality}
            onChange={(e) => onQualityChange(e.target.value)}
            className="input-field"
          >
            <option value="">All Qualities</option>
            {qualities.map((quality) => (
              <option key={quality} value={quality}>
                {quality}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
