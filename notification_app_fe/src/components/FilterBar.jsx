import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function FilterBar({ filterType, onFilterChange }) {
  return (
    <Box sx={{ mb: 3, minWidth: 200 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Notification Type</InputLabel>
        <Select
          value={filterType}
          label="Notification Type"
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterBar;