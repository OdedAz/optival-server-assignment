exports.up = function (knex) {
  return knex.schema
    .createTable("sources", (table) => {
      table.increments("id").notNullable().primary();
      table.string("name").notNullable();
      table.string("url").notNullable();
      table.jsonb("transformed_data");
      table.string("refresh_time");
      table.timestamp("last_time_data_updated").notNullable();
      table.timestamps(true, true);
    })
    .createTable("display_configurations", (table) => {
      table.increments("id").notNullable().primary();
      table.integer("source_id");
      table.string("feed_name").notNullable();
      table.string("column_name");
      table.string("operator");
      table.string("condition");
      table.string("value").notNullable();

      table.timestamps(true, true);
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("display_options")
    .dropTable("configurations_options")
};

