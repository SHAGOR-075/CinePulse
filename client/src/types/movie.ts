export interface Movie {
  _id: string
  title: string
  description: string
  category: string
  quality: string
  size: string
  downloadLink: string
  poster: string
  createdAt: string
  updatedAt: string
}

export interface MovieFilters {
  category?: string
  quality?: string
  search?: string
}
