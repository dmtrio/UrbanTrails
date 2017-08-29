const Hapi = require('hapi')
const path = require('path')

// Create a server with a host and port
const server = new Hapi.Server()

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
})

server.route({
  method: 'GET',
  path: '/kiosks',
  handler: {
    file: {
      path: path.join(__dirname, '../client/data/bCycleKiosks.json')
    }
  }
})

server.route({
  method: 'GET',
  path: '/fixits',
  handler: {
    file: {
      path: path.join(__dirname, '../client/data/fixit.json')
    }
  }
})

server.route({
  method: 'GET',
  path: '/trails',
  handler: {
    file: {
      path: path.join(__dirname, '../client/data/AustinTrails.geojson')
    }
  }
})

// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
