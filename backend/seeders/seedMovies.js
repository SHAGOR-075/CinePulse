import mongoose from 'mongoose'
import Movie from '../models/Movie.js'
import { sampleMovies } from '../data/sampleMovies.js'

const seedMovies = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/movieshuttle')
    
    // Clear existing movies
    await Movie.deleteMany({})
    console.log('Cleared existing movies')
    
    // Insert sample movies
    const movies = await Movie.insertMany(sampleMovies)
    console.log(`Inserted ${movies.length} sample movies`)
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding movies:', error)
    process.exit(1)
  }
}

seedMovies()
