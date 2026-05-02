import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Alert,
} from "@mui/material";
import NotificationCard from "../components/NotificationCard";
import FilterBar from "../components/FilterBar";
import { fetchNotifications } from "../api/notifications";
import log from "../utils/logger";

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [readIds, setReadIds] = useState(() => {
    const saved = localStorage.getItem("readIds");
    return saved ? JSON.parse(saved) : [];
  });

  const LIMIT = 10;

  useEffect(() => {
    loadNotifications();
  }, [page, filterType]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = { limit: LIMIT, page };
      if (filterType) params.notification_type = filterType;

      await log("info", "controller", `Loading notifications page ${page}`);

      const data = await fetchNotifications(params);
      setNotifications(data);
      setTotalPages(Math.ceil(data.length / LIMIT) || 1);

      await log("info", "controller", `Loaded ${data.length} notifications`);
    } catch (err) {
      setError("Failed to load notifications. Please try again.");
      await log("error", "controller", `Failed to load: ${err.message}`);
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

  const handleFilterChange = (type) => {
    setFilterType(type);
    setPage(1);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, pt: 14 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        All Notifications
      </Typography>

      <FilterBar filterType={filterType} onFilterChange={handleFilterChange} />

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

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, val) => setPage(val)}
          color="primary"
        />
      </Box>
    </Container>
  );
}

export default AllNotifications;