"use client";

import { Box, Container, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        mt: 10,
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
    </Container>
  );
}
