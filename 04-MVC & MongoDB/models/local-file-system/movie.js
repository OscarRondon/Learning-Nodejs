import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const movies = readJSON('./movies.json')

export class MovieModel {

  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(m => m.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase()))
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(m => m.id === id)
    return movie
  }

  static async create (input) {
    // Affter data validations
    const newMovie = {
      id: randomUUID(), // UUID v4
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }

  static async update ({ id, input }) {

    const movieIndex = movies.findIndex(m => m.id === id)
    if (movieIndex === -1) return false

    const updateMovie = {
      ...movies[movieIndex],
      ...input
    }

    movies[movieIndex] = updateMovie

    return updateMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)
    return true

  }

}
