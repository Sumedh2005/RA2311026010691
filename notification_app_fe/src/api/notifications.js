import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const fetchNotifications = async (params = {}) => {
  const response = await axios.get(`${BASE_URL}/notifications`, { params });
  return response.data.notifications;
};