import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";

const typeColors = {
  Placement: "success",
  Result: "warning",
  Event: "info",
};

function NotificationCard({ notification, isRead, onRead }) {
  const { ID, Type, Message, Timestamp } = notification;

  return (
    <Card
      onClick={() => onRead(ID)}
      sx={{
        mb: 2,
        cursor: "pointer",
        backgroundColor: isRead ? "#f9f9f9" : "#fff",
        borderLeft: isRead ? "4px solid #ccc" : "4px solid #1976d2",
        boxShadow: isRead ? 1 : 3,
        transition: "all 0.2s",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Chip
            label={Type}
            color={typeColors[Type] || "default"}
            size="small"
            sx={{ fontWeight: "bold" }}
          />
          <Typography variant="caption" color="text.secondary">
            {new Date(Timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            mt: 1,
            fontWeight: isRead ? "normal" : "bold",
            color: isRead ? "text.secondary" : "text.primary",
          }}
        >
          {Message}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;