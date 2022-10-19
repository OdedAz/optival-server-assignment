module.exports = ({ displayConfigurationsDB }) => {
  return async function (req, res) {
    const response = await displayConfigurationsDB.getAll();
    res.status(200).json(response);
  };
};
