import { Toolbar, Typography, Button, Box, Paper } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Navbar() {
  const location = useLocation();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          border: "1.5px solid #1a1a1a",
          borderRadius: "50px",
          px: 3,
          py: 0.5,
          minWidth: "500px",
        }}
      >
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <NotificationsIcon sx={{ color: "#1a1a1a", fontSize: "1.2rem" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#1a1a1a" }}>
            Campus Notifications
          </Typography>
        </Box>

        {/* Nav Buttons */}
        <Box display="flex" gap={1}>
          <Button
            component={Link}
            to="/"
            size="small"
            sx={{
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: "bold",
              px: 2,
              backgroundColor: location.pathname === "/" ? "#1a1a1a" : "transparent",
              color: location.pathname === "/" ? "#fff" : "#1a1a1a",
              "&:hover": {
                backgroundColor: location.pathname === "/" ? "#333" : "#f0f0f0",
              },
            }}
          >
            All
          </Button>
          <Button
            component={Link}
            to="/priority"
            size="small"
            sx={{
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: "bold",
              px: 2,
              backgroundColor: location.pathname === "/priority" ? "#1a1a1a" : "transparent",
              color: location.pathname === "/priority" ? "#fff" : "#1a1a1a",
              "&:hover": {
                backgroundColor: location.pathname === "/priority" ? "#333" : "#f0f0f0",
              },
            }}
          >
            Priority Inbox
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Navbar;