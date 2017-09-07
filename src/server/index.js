const Hapi = require('hapi')
const path = require('path')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './src/urban-trails-info.sqlite3'
  },
  useNullAsDefault: true
})
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
  method: 'POST',
  path: '/signup',
  handler: (request, reply) => {
    console.log('reques', request)
    console.log('reques.eems', request.payload.email)

    // check if user exists
    knex('users').where({email: request.payload.email})
      .then((exist) => {
        if (!exist.length) {
          // add user if it doesn't exist
          knex('users').insert({ email: request.payload.email, phone: request.payload.phone, password: request.payload.password})
          .then((num) => {
            // search for user to return
            knex('users').where({id: num[0]})
            .then ((user) => {
              reply(user)
            })
            .catch((error) => {
              console.log(error)
            })
          })
          .catch((error) => {
            console.log(error)
          })
        } else {
          reply('Email already in use').code(409)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
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

server.route({
  method: 'POST',
  path: '/report',
  handler: (request, reply) => {
    knex('reports').insert({ report_type: request.payload.reportType, report_data: request.payload.reportContent, coordinates: request.payload.position, userid: request.payload.userid })
      .then((report) => {
        reply(report)
      })
      .catch((error) => {
        console.log(error)
      })
  }
})

// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
