import { Box, Typography } from "@mui/material";
import { type Metadata } from "next";
import { Suspense } from "react";
import { ActivityListItemSkeleton } from "~/components/ActivityListItemSkeleton";
import ActivityList from "./ActivityList";

export const metadata: Metadata = {
  title: "ダッシュボード - ルーティンナさん | Routinena",
};

export default function DashboardPage() {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Typography variant="h1">予定</Typography>
      </Box>

      <Box sx={{ py: 2 }}>
        <Suspense fallback={<ActivityListItemSkeleton />}>
          <ActivityList />
        </Suspense>
      </Box>
    </>
  );
}
