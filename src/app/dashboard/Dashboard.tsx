"use client";

import { Box, Container, Skeleton, Typography, styled } from "@mui/material";

import ActivityList from "./ActivityList";
import { Suspense } from "react";

const LoadingSkeleton = styled(Skeleton)(({ theme }) => ({
  width: "100%",
  height: 50,
  borderRadius: theme.shape.borderRadius,
}));

export default function Dashboard() {
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
          直近の予定
        </Typography>
      </Box>
      <Box sx={{ py: 2 }}>
        <Suspense fallback={<LoadingSkeleton variant="rounded" />}>
          <ActivityList />
        </Suspense>
      </Box>
    </Container>
  );
}
