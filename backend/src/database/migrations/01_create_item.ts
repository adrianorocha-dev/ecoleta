import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('item', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('icon').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('item');
}
