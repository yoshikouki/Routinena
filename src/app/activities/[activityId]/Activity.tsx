"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { redirect } from "next/navigation";

import { useActivity } from "~/hooks/activities";

export default function Activity({ activityId }: { activityId: string }) {
  const { activity } = useActivity({ activityId });

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        mt: 10,
        padding: 0,
        gap: 4,
      }}
    >
      <Box>
        <Typography
          component="h1"
          sx={{
            fontWeight: 900,
            fontSize: 30,
          }}
        >
          {activity?.name}
        </Typography>
      </Box>

      <Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1">{activity?.description}</Typography>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Button color="warning" variant="outlined" fullWidth>
            削除
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
