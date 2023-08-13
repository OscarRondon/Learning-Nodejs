import { Router } from 'express'
import { readJSON } from '../utils.js'
import { validateMovie, validatePartialMovie } from '../Schemas/movie.js'

import { MovieModel } from '../models/movie.js'

const movies = readJSON('./movies.json')

export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
  const { genre } = req.query
  const movies = await MovieModel.getAll(genre)
  res.json(movies)
})

moviesRouter.get('/:id', async (req, res) => { // path-to-regex
  const { id } = req.params
  const movie = await MovieModel.getById({ id })
  if (!movie) return res.status(404).json({ message: 'Movie not found' })
  res.json(movie)
})

moviesRouter.post('/', async (req, res) => {

  const valResult = validateMovie(req.body)

  if (valResult.error) return res.status(400).json({ error: JSON.parse(valResult.error.message) })

  // Affter data validations
  const newMovie = await MovieModel.create({ input: valResult.data })
  res.status(201).json(newMovie)

})

moviesRouter.patch('/:id', async (req, res) => { // path-to-regex

  const valResult = validatePartialMovie(req.body)

  if (valResult.error) return res.status(400).json({ error: JSON.parse(valResult.error.message) })

  const { id } = req.params
  const movieIndex = await MovieModel.update({ id, input: valResult.data })

  if (movieIndex === false) return res.status(404).json({ message: 'Movie not found' })

  const updateMovie = {
    ...movies[movieIndex],
    ...valResult.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)

})

moviesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const movieIndex = await MovieModel.delete({ id })

  if (movieIndex === false) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  return res.json({ message: 'Movie deleted' })
})
