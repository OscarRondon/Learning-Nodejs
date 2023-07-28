const http = require('node:http') // protocolo HTTP
const fs = require('node:fs') // file system

const desiredPort = process.env.PORT ?? 22522

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200
    res.end('Hola mundo')
  } else if (req.url === '/images/The_Witcher_Title_Card.png') {
    fs.readFile('./Images/The_Witcher_Title_Card.png',
      (err, data) => {
        if (err) {
          res.statusCode = 500
          res.end('Error al leer el archivo')
        } else {
          res.statusCode = 200
          res.setHeader('Content-Type', 'image/png')
          res.end(data)
        }
      })
    res.statusCode = 200
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('datos de contacto')
  } else {
    res.statusCode = 404
    res.end('Página no encontrada')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
