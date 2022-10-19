module.exports = ({ sourcesDB, validate, DBTableSchemes }) => {
  return async function (req, res) {
    const body = req.body;
    body.last_time_data_updated = Date.now();
    const response = validate(DBTableSchemes.sourceScheme, body);
    await sourcesDB.create(response);
    res.status(200).end();
  };
};
