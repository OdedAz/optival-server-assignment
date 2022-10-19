const config = require("../../lib/services/Config");

module.exports.migrate = async () => {
  const client = require("knex")(config.dbCredentials.db);
  console.info("Starting migration.");
  // await client.raw(`CREATE SCHEMA IF NOT EXISTS ${schema}`)
  await client.migrate.latest({
    directory: "./migrations/scripts/",
  });
  await client.destroy();

  console.info("Migration done.");
};
