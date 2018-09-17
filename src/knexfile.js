module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './urban-trails-info.sqlite3'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './urban-trails-info.sqlite3'
    },
    migrations: {
        directory: './migrations',
        tableName: 'users',
    },
    useNullAsDefault: true
  }

}
