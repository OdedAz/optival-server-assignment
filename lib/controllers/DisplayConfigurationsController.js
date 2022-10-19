const router = require("express").Router();
const CreateConfigurationHandler = require("../handlers/Display-Configurations/Create");
const getAllConfigurationsHandler = require("../handlers/Display-Configurations/GetAll");
const UpdateHandler = require("../handlers/Display-Configurations/Update");
module.exports = (services) => {
  // All the routers for that handler
  router.get("/get_all", getAllConfigurationsHandler(services));
  router.post("/create", CreateConfigurationHandler(services));
  router.patch("/update", UpdateHandler(services));
  // router.delete('/delete', DeleteHandler(services))
  return router;
};
