exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function (table) {
      table.increments('id');
      table.text('username');
      table.text('password');
    }),
    knex.schema.createTableIfNotExists('mentions', function (table) {
      table.increments('id');
      table.text('mention_type');
      table.text('coordinates');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.text('userid').references('id').inTable('users');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('mentions')
  ]);
};