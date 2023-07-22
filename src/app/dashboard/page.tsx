import { type Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
import { Suspense } from "react";
import ActivityList, { ActivityListSkeleton } from "./ActivityList";

export const metadata: Metadata = {
  title: "ダッシュボード - ルーティンナさん | Routinena",
};

export default function DashboardPage() {
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
        <Suspense fallback={<ActivityListSkeleton />}>
          <ActivityList />
        </Suspense>
      </Box>
    </Container>
  );
}
