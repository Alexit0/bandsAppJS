module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/db.sqlite3",
    },
    migrations: {
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  },
};
