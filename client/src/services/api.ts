import axios from 'axios'
import { Movie, MovieFilters } from '../types/movie'

const API_BASE_URL = 'https://cine-pulsebackend.vercel.app/api'                         

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const movieApi = {
  getMovies: async (filters?: MovieFilters): Promise<Movie[]> => {
    const params = new URLSearchParams()
    if (filters?.category) params.append('category', filters.category)
    if (filters?.quality) params.append('quality', filters.quality)
    if (filters?.search) params.append('search', filters.search)
    
    const response = await api.get(`https://cine-pulsebackend.vercel.app/api/movies?${params.toString()}`)
    return response.data.data || response.data || []
  },

  getMovie: async (id: string): Promise<Movie> => {
    const response = await api.get(`https://cine-pulsebackend.vercel.app/api/movies/${id}`)
    return response.data.data || response.data
  },

  getFeaturedMovies: async (): Promise<Movie[]> => {
    const response = await api.get('https://cine-pulsebackend.vercel.app/api/movies?limit=6')
    return response.data.data || response.data || []
  },

  getLatestMovies: async (): Promise<Movie[]> => {
    const response = await api.get('https://cine-pulsebackend.vercel.app/api/movies?sort=createdAt&limit=8')
    return response.data.data || response.data || []
  }
}

export default api
