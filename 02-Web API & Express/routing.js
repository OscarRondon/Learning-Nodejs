const http = require('node:http')

// eslint-disable-next-line padded-blocks
const processRequest = (request, response) => {

  const { method, url } = request
}

const server = http.createServer(processRequest)

server.listen(22522, () => {
  console.log('Server is running on port https://localhost:22522')
})
