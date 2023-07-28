const http = require('node:http')

const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (request, response) => {

  response.Header('Content-Type', 'text/html; charset=utf-8')

  const { method, url } = request

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          response.Header('Content-Type', 'application/json; charset=utf-8')
          return response.end(JSON.stringify(dittoJSON))
        default:
          response.statusCode = 404
          response.Header('Content-Type', 'text/html; charset=utf-8')
          return response.end('<h1>404 Not Found</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon':{
          let body = ''
          request.on('data', (chunk) => {
            body += chunk.toString()
          })
          request.on('end', () => {
            const data = JSON.parse(body)
            response.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            response.end(JSON.stringify(data))
          })
          break
        }
        default:
          response.statusCode = 404
          response.Header('Content-Type', 'text/html; charset=utf-8')
          return response.end('<h1>404 Not Found</h1>')
      }
      break
    default:
      response.statusCode = 404
      response.Header('Content-Type', 'text/html; charset=utf-8')
      return response.end('<h1>404 Not Found</h1>')
  }

}

const server = http.createServer(processRequest)

server.listen(22522, () => {
  console.log('Server is running on port https://localhost:22522')
})
