const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const apiRoutes = require('./routes/api-routes')
app.use('/api', apiRoutes)

let config = require('../nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')

const connectedUsers = []

app.get('/users', function (req, res) {
  res.json({ users: connectedUsers })
})

const nuxt = new Nuxt(config)
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(nuxt.render)

server.listen(port, host)
console.log('Server is listening on ' + host + ':' + port)

function getRndInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const messages = []
const nicks = [
  'red',
  'green',
  'blue',
]

io.on('connection', function (socket) {

  const nick = nicks[getRndInteger(0, 2)] + '-' + +new Date()
  connectedUsers.push(nick)
  io.emit('nick', nick)
  io.emit('messages', messages)

  socket.on('chat message', function (data) {
    messages.push(data)
    io.emit('chat message', data)
  })

  socket.on('disconnect', function () {
    connectedUsers.splice(connectedUsers.indexOf(nick), 1)
    console.log('user disconnected')
  })
})
