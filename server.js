const config = require("./lib/services/Config");
const app = require("./lib/app");
const SourcesDB = require("./lib/AppDB/SourcesDB");
const DisplayConfigurationsDB = require("./lib/AppDB/DisplayConfigurationsDB");
const DBTableSchemes = require("./lib/AppDB/DatabaseTablesSchemes");
const validate = require("./lib/services/Validator");

async function main() {
  try {
    const sourcesDB = new SourcesDB(config.dbCredentials.db);
    const displayConfigurationsDB = new DisplayConfigurationsDB(
      config.dbCredentials.db
    );

    await sourcesDB.testConnection();
    await displayConfigurationsDB.testConnection();

    const services = {
      sourcesDB,
      displayConfigurationsDB,
      DBTableSchemes,
      validate,
    };
    app(config, services);
  } catch (error) {
    console.log(error);
  }
}

main();
