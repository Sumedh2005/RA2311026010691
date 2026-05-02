import { Card, CardContent, Typography, Chip, Box, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const typeStyles = {
  Placement: {
    chipColor: "#c62828",
    cardBg: "#fff5f5",
    borderColor: "#c62828",
  },
  Result: {
    chipColor: "#e65100",
    cardBg: "#fff8f0",
    borderColor: "#e65100",
  },
  Event: {
    chipColor: "#f9a825",
    cardBg: "#fffde7",
    borderColor: "#f9a825",
  },
};

function NotificationCard({ notification, isRead, onRead }) {
  const { ID, Type, Message, Timestamp } = notification;
  const style = typeStyles[Type] || { chipColor: "#555", cardBg: "#fafafa", borderColor: "#ccc" };

  const dateObj = new Date(Timestamp);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: "12px",
        backgroundColor: isRead ? "#f9f9f9" : style.cardBg,
        boxShadow: "none",
        border: "1px solid #e0e0e0",
        
      }}
    >
      <CardContent sx={{ padding: "16px !important" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* LEFT — Tag + Message */}
          <Box display="flex" flexDirection="column" gap={0.5}>
            <Chip
  label={Type}
  size="small"
  sx={{
    backgroundColor: "transparent",
    color: isRead ? "#bdbdbd" : style.chipColor,
    border: `1.5px solid ${isRead ? "#bdbdbd" : style.chipColor}`,
    fontWeight: "bold",
    borderRadius: "6px",
    width: "fit-content",
  }}
/>
            <Typography
              variant="body1"
              sx={{
                fontWeight: isRead ? "normal" : "bold",
                color: isRead ? "#757575" : "#1a1a1a",
              }}
            >
              {Message}
            </Typography>
          </Box>

          {/* RIGHT — Date, Time, Mark as Read */}
          <Box display="flex" flexDirection="column" alignItems="flex-end" gap={0.8}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <CalendarTodayIcon sx={{ fontSize: "0.75rem", color: "#9e9e9e" }} />
              <Typography variant="caption" color="text.secondary">
                {date}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <AccessTimeIcon sx={{ fontSize: "0.75rem", color: "#9e9e9e" }} />
              <Typography variant="caption" color="text.secondary">
                {time}
              </Typography>
            </Box>
            {!isRead ? (
              <Button
                size="small"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  onRead(ID);
                }}
                sx={{
                  fontSize: "0.7rem",
                  borderColor: "#4caf50",
                  color: "#4caf50",
                  borderRadius: "8px",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  mt: 0.5,
                  "&:hover": {
                    backgroundColor: "#e8f5e9",
                    borderColor: "#388e3c",
                  },
                }}
              >
                Mark as Read
              </Button>
            ) : (
              <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
                ✓ Read
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;