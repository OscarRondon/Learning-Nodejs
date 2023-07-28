const express = require('express')

const dittoJSON = require('./pokemon/ditto.json')

const port = process.env.PORT || 22522

const app = express()
app.disable('x-powered-by')

// This is middleware to make acction before the request been resolve
app.use((req, res, next) => {
  // chek cookies
  // track data
  // log data
  // check authentication
  // etc, basicly we can do anything here
  console.log(next)
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    req.body = data
    return next()
  })
})

app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to my API!</h1>')

})

app.get('/pokemon/ditto', (req, res) => {
  res.status(200).json(dittoJSON)
})

app.post('/pokemon', (req, res) => {
  // let body = ''
  // req.on('data', (chunk) => {
  //   body += chunk.toString()
  // })
  // req.on('end', () => {
  //   const data = JSON.parse(body)
  //   res.status(201).send(data)
  // })
  res.status(201).json(req.body) // this was processed on the middleware
})

app.use((req, res) => {
  res.status(404).send('<h1>404</h1> Page not found')

})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
