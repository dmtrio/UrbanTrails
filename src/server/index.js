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

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => reply('Hello, world!'),
})

server.route({
  method: 'GET',
  path: '/{name}',
  handler: (request, reply) => reply(`Hello, ${encodeURIComponent(request.params.name)}!`),
})

// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
