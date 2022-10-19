module.exports = ({ sourcesDB, validate, DBTableSchemes }) => {
  return async function (req, res) {
    const body = validate(DBTableSchemes.sourceScheme, req.body);
    await sourcesDB.update(body);
    res.status(200).end();
  };
};
