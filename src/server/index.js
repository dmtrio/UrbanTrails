const Hapi = require('hapi')
const path = require('path')

// Create a server with a host and port
const server = new Hapi.Server({
  // connections: {
  //   routes: {
  //     files: {
  //       relativeTo: path.join(__dirname, '../client/')
  //     }
  //   }
  // }
})

server.connection({
  host: 'localhost',
  port: 8000,
})


// Add the route
server.register(require('inert'), (err) => {
  if (err) {
    throw err
  }

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, '../client/')
      }
    }
  })

  // server.route({
  //   method: 'GET',
  //   path: '/',
  //   handler: (request, reply) => //{
  //     // console.log(path.join(__dirname))
  //     reply.file('index.html'),
  //     // }
  // })
})

// server.route({
//   method: 'GET',
//   path: '/index.html',
//   handler: (request, reply) => {
//
//     console.log('hit here')
//     reply.file('./src/client/index.html')
//   },
// })

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => reply('hello world'),
})

// server.route({
//   method: 'GET',
//   path: '/dist/build.js',
//   handler: (request, reply) => reply.file('./src/client/dist/build.js'),
// })

// server.route({
//   method: 'GET',
//   path: '/manifest.json',
//   handler: (request, reply) => reply.file('./src/client/manifest.json'),
// })

// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
