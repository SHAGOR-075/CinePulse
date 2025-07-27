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

export interface CreateMovieData {
  title: string
  description: string
  category: string
  quality: string
  size: string
  downloadLink: string
  poster: string
}

export interface UpdateMovieData extends CreateMovieData {
  _id: string
}
