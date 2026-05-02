import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import NotificationCard from "../components/NotificationCard";
import FilterBar from "../components/FilterBar";
import { fetchNotifications } from "../api/notifications";
import log from "../utils/logger";

const TYPE_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function getPriorityScore(notification) {
  const weight = TYPE_WEIGHT[notification.Type] || 0;
  const recency = new Date(notification.Timestamp).getTime();
  return weight * 1e13 + recency;
}

function PriorityInbox() {
  const [notifications, setNotifications] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [topN, setTopN] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [readIds, setReadIds] = useState(() => {
    const saved = localStorage.getItem("readIds");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    loadPriorityNotifications();
  }, [filterType, topN]);

  const loadPriorityNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      await log("info", "controller", `Loading priority inbox top ${topN}`);

      const params = {};
      if (filterType) params.notification_type = filterType;

      const data = await fetchNotifications(params);

      const sorted = [...data]
        .sort((a, b) => getPriorityScore(b) - getPriorityScore(a))
        .slice(0, topN);

      setNotifications(sorted);

      await log("info", "controller", `Priority inbox loaded ${sorted.length} notifications`);
    } catch (err) {
      setError("Failed to load priority notifications.");
      await log("error", "controller", `Priority inbox error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = (id) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      setReadIds(updated);
      localStorage.setItem("readIds", JSON.stringify(updated));
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, pt: 14 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Priority Inbox
      </Typography>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <FilterBar filterType={filterType} onFilterChange={(val) => setFilterType(val)} />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Show Top</InputLabel>
          <Select
            value={topN}
            label="Show Top"
            onChange={(e) => setTopN(e.target.value)}
          >
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={15}>Top 15</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && notifications.length === 0 && (
        <Typography color="text.secondary">No notifications found.</Typography>
      )}

      {!loading &&
        notifications.map((n) => (
          <NotificationCard
            key={n.ID}
            notification={n}
            isRead={readIds.includes(n.ID)}
            onRead={handleRead}
          />
        ))}
    </Container>
  );
}

export default PriorityInbox;