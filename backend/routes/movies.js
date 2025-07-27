import express from 'express'
import { body, validationResult } from 'express-validator'
import Movie from '../models/Movie.js'

const router = express.Router()

// Simple auth middleware for admin operations
const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    })
  }
  
  const token = authHeader.substring(7)
  // Simple token validation - in production, use proper JWT validation
  if (token === 'mock-jwt-token') {
    req.user = { role: 'admin' }
    next()
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    })
  }
}

// Validation middleware
const movieValidation = [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('description').trim().isLength({ min: 1, max: 2000 }).withMessage('Description must be between 1 and 2000 characters'),
  body('category').isIn(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Adventure']).withMessage('Invalid category'),
  body('quality').isIn(['720p', '1080p', '4K', 'HD', 'CAM']).withMessage('Invalid quality'),
  body('size').trim().isLength({ min: 1, max: 50 }).withMessage('Size must be between 1 and 50 characters'),
  body('downloadLink').isURL().withMessage('Download link must be a valid URL'),
  body('poster').isURL().withMessage('Poster must be a valid URL')
]

// GET /api/movies - Get all movies with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, quality, search, sort = 'createdAt', order = 'desc', limit, page = 1 } = req.query
    
    // Build query
    const query = {}
    
    if (category) query.category = category
    if (quality) query.quality = quality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }
    
    // Build sort object
    const sortObj = {}
    sortObj[sort] = order === 'desc' ? -1 : 1
    
    // Calculate pagination
    const pageNum = parseInt(page)
    const limitNum = limit ? parseInt(limit) : undefined
    const skip = limitNum ? (pageNum - 1) * limitNum : 0
    
    // Execute query
    let movieQuery = Movie.find(query).sort(sortObj)
    
    if (limitNum) {
      movieQuery = movieQuery.skip(skip).limit(limitNum)
    }
    
    const movies = await movieQuery.exec()
    
    // Get total count for pagination
    const total = await Movie.countDocuments(query)
    
    res.json({
      success: true,
      data: movies,
      pagination: limitNum ? {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      } : undefined
    })
  } catch (error) {
    console.error('Error fetching movies:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching movies',
      error: error.message
    })
  }
})

// GET /api/movies/stats - Get movie statistics
router.get('/stats', async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments()
    const categories = await Movie.distinct('category')
    const qualities = await Movie.distinct('quality')
    
    const categoryStats = await Movie.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    
    const qualityStats = await Movie.aggregate([
      { $group: { _id: '$quality', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    
    res.json({
      success: true,
      data: {
        totalMovies,
        totalCategories: categories.length,
        totalQualities: qualities.length,
        categoryStats,
        qualityStats
      }
    })
  } catch (error) {
    console.error('Error fetching statistics:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    })
  }
})

// GET /api/movies/:id - Get single movie
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      })
    }
    
    // Increment view count
    movie.views = (movie.views || 0) + 1
    await movie.save()
    
    res.json({
      success: true,
      data: movie
    })
  } catch (error) {
    console.error('Error fetching movie:', error)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID'
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error fetching movie',
      error: error.message
    })
  }
})

// POST /api/movies - Create new movie (Admin only)
router.post('/', adminAuth, movieValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      })
    }
    
    const movieData = {
      ...req.body,
      views: 0,
      downloads: 0
    }
    
    const movie = new Movie(movieData)
    await movie.save()
    
    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: movie
    })
  } catch (error) {
    console.error('Error creating movie:', error)
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating movie',
      error: error.message
    })
  }
})

// PUT /api/movies/:id - Update movie (Admin only)
router.put('/:id', adminAuth, movieValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      })
    }
    
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Movie updated successfully',
      data: movie
    })
  } catch (error) {
    console.error('Error updating movie:', error)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID'
      })
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating movie',
      error: error.message
    })
  }
})

// DELETE /api/movies/:id - Delete movie (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Movie deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting movie:', error)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID'
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error deleting movie',
      error: error.message
    })
  }
})

// POST /api/movies/:id/download - Track download (increment download count)
router.post('/:id/download', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      })
    }
    
    movie.downloads = (movie.downloads || 0) + 1
    await movie.save()
    
    res.json({
      success: true,
      message: 'Download tracked successfully',
      data: { downloads: movie.downloads }
    })
  } catch (error) {
    console.error('Error tracking download:', error)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID'
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error tracking download',
      error: error.message
    })
  }
})

export default router
