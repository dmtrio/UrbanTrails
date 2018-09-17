module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './urban-trails-info.sqlite3'
    },
    migrations: {
        directory: './migrations',
    },
    useNullAsDefault: true
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './prodbd.sqlite3'
    },
    migrations: {
        directory: './migrations',
    },
    useNullAsDefault: true
  }

}
