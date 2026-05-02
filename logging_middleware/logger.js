const axios = require("axios");

const BASE_URL = "http://20.207.122.201/evaluation-service";

const Log = async (token, stack, level, package_, message) => {
  await axios.post(
    `${BASE_URL}/logs`,
    { stack, level, package: package_, message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

module.exports = Log;
