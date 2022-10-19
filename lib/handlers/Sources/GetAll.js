module.exports = ({ sourcesDB }) => {
  return async function (req, res) {
    const response = await sourcesDB.getAll();
    res.status(200).json(response);
  };
};
