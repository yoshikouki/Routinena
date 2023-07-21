"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { Check, Dehaze } from "@mui/icons-material";

import Link from "next/link";
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
          直近の予定
        </Typography>
      </Box>
      <Box sx={{ py: 2 }}>
        {activities ? (
          activities.map((activity) => (
            <Box key={activity.id} sx={{ mb: 1, py: 2 }}>
              <Box
                component={Typography}
                variant="h3"
                sx={{ fontWeight: 900, fontSize: "1.1rem" }}
              >
                {activity.name}
              </Box>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {activity.description}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{ flex: 1, py: 1 }}
                  startIcon={<Check />}
                >
                  完了
                </Button>
                <Button
                  LinkComponent={Link}
                  href={`/activities/${activity.id}`}
                  startIcon={<Dehaze />}
                  variant="outlined"
                  sx={{ flex: 1, py: 1 }}
                >
                  詳細
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body1">予定を追加しましょう！</Typography>
        )}
      </Box>
    </Container>
  );
}
