import axios from "axios";

const log = async (level, package_, message) => {
  try {
    await axios.post("http://localhost:8000/log", {
      level,
      package: package_,
      message,
    });
  } catch (err) {
    // silent fail
  }
};

export default log;