import { type Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
import ActivityListItem from "./ActivityListItem";
import { useServerActivities } from "~/hooks/server-activities";

export const metadata: Metadata = {
  title: "ダッシュボード - ルーティンナさん | Routinena",
};

export default async function DashboardPage() {
  const activities = await useServerActivities.getAll();

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
        {activities.length === 0 && (
          <Typography variant="body1">予定を作成しましょう</Typography>
        )}
        {activities.map((activity) => (
          <ActivityListItem key={activity.id} activity={activity} />
        ))}
      </Box>
    </Container>
  );
}
