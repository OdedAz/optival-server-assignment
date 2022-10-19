module.exports = ({ displayConfigurationsDB, validate, DBTableSchemes }) => {
  return async function (req, res) {
    const body = validate(DBTableSchemes.configurationSchema, req.body);
    await displayConfigurationsDB.update(body);
    res.status(200).end();
  };
};
