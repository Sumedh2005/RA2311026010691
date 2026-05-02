import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Navbar() {
  const location = useLocation();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <NotificationsIcon sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Campus Notifications
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ fontWeight: location.pathname === "/" ? "bold" : "normal" }}
          >
            All
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/priority"
            sx={{ fontWeight: location.pathname === "/priority" ? "bold" : "normal" }}
          >
            Priority Inbox
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

