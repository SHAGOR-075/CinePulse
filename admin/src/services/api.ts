import axios from 'axios'
import { Movie, CreateMovieData, UpdateMovieData } from '../types/movie'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const movieApi = {
  getMovies: async (): Promise<Movie[]> => {
    try {
      const response = await api.get('/movies')
      return response.data.data || response.data || []
    } catch (error) {
      console.error('Error fetching movies:', error)
      throw error
    }
  },

  getMovie: async (id: string): Promise<Movie> => {
    try {
      const response = await api.get(`/movies/${id}`)
      return response.data.data || response.data
    } catch (error) {
      console.error('Error fetching movie:', error)
      throw error
    }
  },

  createMovie: async (data: CreateMovieData): Promise<Movie> => {
    try {
      const response = await api.post('/movies', data)
      return response.data.data || response.data
    } catch (error) {
      console.error('Error creating movie:', error)
      throw error
    }
  },

  updateMovie: async (id: string, data: UpdateMovieData): Promise<Movie> => {
    try {
      const response = await api.put(`/movies/${id}`, data)
      return response.data.data || response.data
    } catch (error) {
      console.error('Error updating movie:', error)
      throw error
    }
  },

  deleteMovie: async (id: string): Promise<void> => {
    try {
      await api.delete(`/movies/${id}`)
    } catch (error) {
      console.error('Error deleting movie:', error)
      throw error
    }
  },

  getStats: async () => {
    try {
      const response = await api.get('/movies/stats')
      return response.data.data || response.data
    } catch (error) {
      console.error('Error fetching stats:', error)
      throw error
    }
  }
}

export default api
