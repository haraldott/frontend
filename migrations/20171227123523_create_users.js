exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id').unsigned().primary();
    table.string('username').notNull();
    table.string('email').notNull();
    table.string('password').notNull();
  })
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};