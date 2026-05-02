# Notification System Design

## Stage 1

### Approach
Notifications are fetched from the external API and ranked using a priority score combining:
- **Weight**: Placement (3) > Result (2) > Event (1)
- **Recency**: More recent notifications rank higher within the same type

### Formula
priority_score = weight * 1e13 + timestamp_ms

### Efficient Top-N Maintenance
To efficiently maintain top 10 notifications as new ones arrive, a max-heap (priority queue) approach is used:
- Insert new notification into heap
- Heap automatically maintains order by priority score
- Pop top N elements to get priority inbox

This gives O(log n) insertion and O(n log n) for top-N extraction.

## Stage 2

### Frontend Architecture
- React (Vite) on localhost:3000
- Express backend on localhost:8000 as proxy
- Material UI for styling
- React Router for navigation

### Pages
- / — All Notifications with pagination and filter
- /priority — Priority Inbox with top N selector and filter

### Read/Unread Tracking
Notification IDs are stored in localStorage to persist read state across sessions.
