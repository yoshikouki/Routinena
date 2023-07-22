import { type Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
import { activitiesService } from "~/server/services/activities";
import { getServerAuthSession } from "~/server/auth";
import ActivityListItem from "./ActivityListItem";

export const metadata: Metadata = {
  title: "ダッシュボード - ルーティンナさん | Routinena",
};

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;
  const activities = await activitiesService().getAll(session.user.id);

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
        {activities.map((activity) => (
          <ActivityListItem key={activity.id} activity={activity} />
        ))}
      </Box>
    </Container>
  );
}
