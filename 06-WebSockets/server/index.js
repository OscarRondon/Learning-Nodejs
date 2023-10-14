import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const port = process.env.PORT || 22522

const app = express()
const server = createServer(app)
const io = new Server(server, {connectionStateRecovery:{}})

io.on('connection', (socket) => {
  console.log('New client connected' + socket.id)
  
  socket.on('disconnect', () => {
    console.log('A user has disconected')
  })
  
  socket.on('chat message', (message) => {
    
    io.emit('chat message', message)
  })
  
  console.log(socket.handshake.auth)
})

app.use(logger('dev'))

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})


server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
