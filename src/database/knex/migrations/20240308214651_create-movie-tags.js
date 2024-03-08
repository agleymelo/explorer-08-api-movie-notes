/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable("movie-tags", table => {
  table.increments("id")
  table.text("name")

  table.integer("user_id").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE")
  table.integer("note_id").references("id").inTable("movie-notes").onUpdate("CASCADE").onDelete("CASCADE")

  table.timestamp("crated_at").defaultTo(knex.fn.now())
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("movie-tags")
