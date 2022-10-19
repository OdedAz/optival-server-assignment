const express = require("express");
const cors = require("cors");

const displayConfigurationsController = require("./controllers/DisplayConfigurationsController");
const sourcesController = require("./controllers/sourcesController");
require("express-async-errors");

module.exports = (config, services) => {
  const app = express();
  app.use(cors());
  app.use((req, res, next) => {
    next();
  });
  app.use(express.json());

  app.use("/display-configurations", displayConfigurationsController(services));
  app.use("/source", sourcesController(services));

  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
  });

  app.listen(config.dbCredentials.port, () => {
    console.log(`start listening on port: ${config.dbCredentials.port}`);
  });
};
