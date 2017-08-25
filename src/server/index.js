const Hapi = require('hapi')

// Create a server with a host and port
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000,
})

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => reply('hello world'),
})


server.register(require('inert'), (err) => {
  if (err) {
    throw err
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply.file('./src/client/index.html'),
  })
})

server.route({
  method: 'GET',
  path: '/dist/build.js',
  handler: (request, reply) => reply.file('./src/client/dist/build.js'),
})

// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
