import { MovieModel } from '../models/mysql/movie'
import { validateMovie, validatePartialMovie } from '../Schemas/movie.js'

export class MovieController {

  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (!movie) return res.status(404).json({ message: 'Movie not found' })
    res.json(movie)
  }

  static async create (req, res) {
    const valResult = validateMovie(req.body)

    if (valResult.error) return res.status(400).json({ error: JSON.parse(valResult.error.message) })

    // Affter data validations
    const newMovie = await MovieModel.create({ input: valResult.data })
    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const valResult = validatePartialMovie(req.body)

    if (valResult.error) return res.status(400).json({ error: JSON.parse(valResult.error.message) })

    const { id } = req.params
    const updateMovie = await MovieModel.update({ id, input: valResult.data })

    if (updateMovie === false) return res.status(404).json({ message: 'Movie not found' })

    return res.json(updateMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const movieIndex = await MovieModel.delete({ id })

    if (movieIndex === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    return res.json({ message: 'Movie deleted' })
  }

}
