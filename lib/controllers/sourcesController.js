const router = require("express").Router();
const GetAllHandler = require("../handlers/Sources/GetAll");
const CreateHandler = require("../handlers/Sources/Create");
const FetchMappedSourceData = require("../handlers/mapped-data/FetchMappedSourceData");

module.exports = (services) => {
  // All the routers for that handler
  router.get("/get_all", GetAllHandler(services));
  router.get("/fetch_mapped_source_data", FetchMappedSourceData(services));
  router.post("/create", CreateHandler(services));
  //   router.patch("/update", UpdateHandler(services));
  // router.delete('/delete', DeleteHandler(services))

  return router;
};
