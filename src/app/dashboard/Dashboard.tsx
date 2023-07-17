"use client";

import { Box, Container, Typography } from "@mui/material";
import { useActivities } from "~/hooks/activities";

export default function Dashboard() {
  const { activities } = useActivities();

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        mt: 10,
        padding: 0,
        gap: 4,
      }}
    >
      <Box sx={{}}>
        <Typography
          component="h1"
          sx={{
            fontWeight: 900,
            fontSize: 30,
          }}
        >
          今日の予定
        </Typography>
      </Box>
      <Box sx={{}}>
        {activities ? (
          activities.map((activity) => (
            <Box key={activity.id}>
              <Typography variant="body1">{activity.name}</Typography>
              <Typography variant="body2">{activity.description}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1">予定を追加しましょう！</Typography>
        )}
      </Box>
    </Container>
  );
}
