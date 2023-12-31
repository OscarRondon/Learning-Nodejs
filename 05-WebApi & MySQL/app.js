import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
import { MovieModel } from './models/mysql/movie.js'
import 'dotenv/config'

// Read JSON in ESModules
// import fs from 'node:fs'
// const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url), 'UTF-8'))
// const movies = loadJSON('./movies.json')

// ---------------------- POSTs -----------------------------------------------------

const port = process.env.PORT || 22522

const app = express()
app.use(json())

app.use(corsMiddleware())

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the movie database!')
})

app.use('/movies', createMovieRouter({ movieModel: MovieModel }))

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
