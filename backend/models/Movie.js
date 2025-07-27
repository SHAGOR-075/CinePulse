import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Movie description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Movie category is required'],
    enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Adventure'],
    trim: true
  },
  quality: {
    type: String,
    required: [true, 'Movie quality is required'],
    enum: ['720p', '1080p', '4K', 'HD', 'CAM'],
    trim: true
  },
  size: {
    type: String,
    required: [true, 'Movie size is required'],
    trim: true,
    maxlength: [50, 'Size cannot exceed 50 characters']
  },
  downloadLink: {
    type: String,
    required: [true, 'Download link is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v)
      },
      message: 'Download link must be a valid URL'
    }
  },
  poster: {
    type: String,
    required: [true, 'Poster URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v)
      },
      message: 'Poster must be a valid URL'
    }
  },
  views: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Indexes for better query performance
movieSchema.index({ title: 'text', description: 'text' })
movieSchema.index({ category: 1 })
movieSchema.index({ quality: 1 })
movieSchema.index({ createdAt: -1 })

export default mongoose.model('Movie', movieSchema)
