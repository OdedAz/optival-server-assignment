const knex = require("knex");

module.exports = class Configurations {
  constructor(config) {
    this._knex = knex(config);
  }

  async testConnection() {
    return this._knex.raw("select 1");
  }

  // CLIENTS ENDPOINTS
  async getAll() {
    return this._knex("sources").select("*");
  }
  async getSource(id) {
    return this._knex("sources").where({ id }).first().select("*");
  }
  async create(req) {
    return this._knex("sources").insert(req);
  }

  async update(req) {
    return this._knex("sources").where({ id: req.id }).update(req);
  }
};
