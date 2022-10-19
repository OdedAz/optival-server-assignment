const knex = require("knex");

module.exports = class DisplayOptions {
  constructor(config) {
    this._knex = knex(config);
  }

  async testConnection() {
    return this._knex.raw("select 1");
  }

  // DISPLAY OPTIONS ENDPOINTS
  async getAll() {
    return this._knex("display_configurations").select("*");
  }

  async create(req) {
    return this._knex("display_configurations").insert(req);
  }

  async update(req) {
    return this._knex("display_configurations")
      .where({ id: req.id })
      .update(req);
  }

  async getConfigurationsBySourceId(source_id) {
    return this._knex("display_configurations")
      .where({ source_id })
      .select("*");
  }
};
