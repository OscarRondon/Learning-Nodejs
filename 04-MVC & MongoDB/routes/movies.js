import { randomUUID } from 'node:crypto'
import { Router } from 'express'
import { readJSON } from '../utils.js'
import { validateMovie, validatePartialMovie } from '../Schemas/movie.js'

const movies = readJSON('./movies.json')

export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter(m => m.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase()))
    return res.json(filteredMovies)
  }
  res.json(movies)
})

moviesRouter.get('/:id', (req, res) => { // path-to-regex
  const { id } = req.params
  const movie = movies.find(m => m.id === id)
  if (!movie) return res.status(404).json({ message: 'Movie not found' })
  res.json(movie)
})

moviesRouter.post('/', (req, res) => {

  const valResult = validateMovie(req.body)

  if (valResult.error) return res.status(400).json({ error: JSON.parse(valResult.error.message) })

  // Affter data validations
  const newMovie = {
    id: randomUUID(),
    ...valResult.data // UUID v4
  }

  movies.push(newMovie)
  res.status(201).json(newMovie)

})

moviesRouter.patch('/:id', (req, res) => { // path-to-regex

  const valResult = validatePartialMovie(req.body)

  if (valResult.error) return res.status(400).json({ error: JSON.parse(valResult.error.message) })

  const { id } = req.params
  const movieIndex = movies.findIndex(m => m.id === id)
  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  const updateMovie = {
    ...movies[movieIndex],
    ...valResult.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)

})

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})
