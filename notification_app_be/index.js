const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const axios = require("axios");
const cors = require("cors");

console.log("ENV CHECK:", {
  email: process.env.EMAIL,
  name: process.env.NAME,
  rollNo: process.env.ROLL_NO,
  clientID: process.env.CLIENT_ID,
});

const app = express();
app.use(express.json());
app.use(cors());

const BASE_URL = "http://20.207.122.201/evaluation-service";

let cachedToken = null;
let tokenExpiry = null;

const getToken = async () => {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  try {
    const res = await axios.post(`${BASE_URL}/auth`, {
      email: process.env.EMAIL,
      name: process.env.NAME,
      rollNo: process.env.ROLL_NO,
      accessCode: process.env.ACCESS_CODE,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    console.log("Token fetched successfully!");
    cachedToken = res.data.access_token;
    tokenExpiry = Date.now() + 14 * 60 * 1000;
    return cachedToken;
  } catch (err) {
    console.error("Auth error status:", err.response?.status);
    console.error("Auth error data:", JSON.stringify(err.response?.data));
    console.error("Auth error message:", err.message);
    throw err;
  }
};

const log = async (level, package_, message) => {
  try {
    const token = await getToken();
    await axios.post(
      `${BASE_URL}/logs`,
      { stack: "frontend", level, package: package_, message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    // silent fail
  }
};

app.get("/notifications", async (req, res) => {
  try {
    console.log("GET /notifications hit");
    const token = await getToken();
    const { limit, page, notification_type } = req.query;

    const params = {};
    if (limit) params.limit = limit;
    if (page) params.page = page;
    if (notification_type) params.notification_type = notification_type;

    await log("info", "controller", `Fetching notifications: ${JSON.stringify(params)}`);

    const response = await axios.get(`${BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });

    await log("info", "controller", `Fetched ${response.data.notifications.length} notifications`);

    res.json(response.data);
  } catch (err) {
    console.error("Notification fetch error:", err.response?.data || err.message);
    await log("error", "controller", `Failed to fetch notifications: ${err.message}`);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// POST /log — frontend logger
app.post("/log", async (req, res) => {
  const { level, package: pkg, message } = req.body;
  await log(level, pkg, message);
  res.json({ success: true });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err.message);
  console.error(err.stack);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});