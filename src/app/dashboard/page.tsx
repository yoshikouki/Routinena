import { Box, Typography } from "@mui/material";
import { type Metadata } from "next";
import { Suspense } from "react";
import { ActivityListItemSkeleton } from "~/components/ActivityListItemSkeleton";
import ActivityList from "./ActivityList";
import Summary from "./Summary";

export const metadata: Metadata = {
  title: "ダッシュボード - ルーティンナさん | Routinena",
};

export default function DashboardPage() {
  return (
    <>
      <Summary />

      <Box sx={{ py: 2 }}>
        <Suspense fallback={<ActivityListItemSkeleton />}>
          <ActivityList />
        </Suspense>
      </Box>
    </>
  );
}
