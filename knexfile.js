const { resolve } = require("node:path")

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, "src", "database", "database.db")
    },
    pool: {
      afterCreate: (connection, cb) => connection.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations: {
      directory: resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  },
};
