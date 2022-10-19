const Moment = require("moment");
const axios = require("axios");
module.exports = ({ sourcesDB, displayConfigurationsDB }) => {
  function checkIfRefreshIsNeeded(source) {
    // if its the first time fetching data
    if (Object.keys(source.transformed_data).length == 0) {
      return {
        isRefreshNeeded: true,
        timeToRefresh: Date.now(),
      };
    }
    // comparing between dates checking if refresh data is needed
    const refresh_time_combination = source.refresh_time.split(" ");
    // example: "1 week"
    const refresh_time_number = refresh_time_combination[0]; // : 1
    const refresh_time_indicator = refresh_time_combination[1]; // : week
    const timeToRefresh = Moment(source.lastUpdate).add(
      refresh_time_number,
      refresh_time_indicator
    );
    const currentDate = Date.now();
    const response = {
      isRefreshNeeded: timeToRefresh.isBefore(currentDate),
      timeToRefresh: timeToRefresh,
    };
    return response;
  }
  function getRelevantConfigurations(name, configurations) {
    return configurations.filter((obj) => obj.feed_name === name);
  }
  function checkConfiguration(configuration, value, flagRef) {
    if (configuration.operator) {
      if (configuration.operator === ">") {
        if (configuration.value > value) {
          flagRef.flag = true;
          return true;
        }
      } else if (configuration.operator === "<") {
        if (configuration.value < value) {
          flagRef.flag = true;
          return true;
        }
      } else {
        if (configuration.value == value) {
          flagRef.flag = true;
          return true;
        }
      }
      if (configuration.condition === "and") {
        flagRef.flag = false;
      }
    }
  }
  function mapData(dataToMap, allConfigurations) {
    const mappedData = {};
    const flagRef = { flag: false };
    Object.keys(dataToMap).forEach(function (dataToMapKey) {
      const keyConfigurations = getRelevantConfigurations(
        dataToMapKey,
        allConfigurations
      );
      if (keyConfigurations.length) {
        keyConfigurations.forEach((configuration) => {
          const configurationCheck = checkConfiguration(
            configuration,
            dataToMap[dataToMapKey],
            flagRef
          );
          if (configurationCheck && flagRef.flag) {
            mappedData[configuration.column_name] = dataToMap[dataToMapKey];
          }
        });
      }
      if (flagRef.flag) return mappedData;
    });

    return mappedData;
  }
  async function refreshData(url, source) {
    try {
      //  this is how the real request should perform
      //   const response = await axios.get('https://'+url);
      //   const rawData = response.data;
      const dummyData = {
        name: "pickacu",
        strength: 70,
        color: "yellow & black",
        type: "land",
        develops: 3,
      };
      const allConfigurations =
        await displayConfigurationsDB.getConfigurationsBySourceId(source.id);
      const mappedData = mapData(dummyData, allConfigurations);
      if (mappedData) {
        source.transformed_data = mappedData;
        source.last_time_data_updated = Moment().format();
        sourcesDB.update(source);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return async function (req, res) {
    const source = await sourcesDB.getSource(req.body.sourceId);
    const check = checkIfRefreshIsNeeded(source);
    if (check.isRefreshNeeded) {
      refreshData(source.url, source);
    }
    res.status(200).json(source.transformed_data);
  };
};
