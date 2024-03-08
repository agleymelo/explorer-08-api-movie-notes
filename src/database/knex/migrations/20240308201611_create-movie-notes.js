/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("movie-notes", table => {
  table.increments("id")

  table.text("title")
  table.text("description")
  table.integer("rating")

  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE")

  table.timestamp("created_at").defaultTo(knex.fn.now())
  table.timestamp("updated_at").defaultTo(knex.fn.now())
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("movie-notes")