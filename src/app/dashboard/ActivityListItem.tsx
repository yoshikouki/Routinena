"use client";

import { Check, Dehaze } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { RelativeDate } from "~/components/RelativeDate";
import { useActivity } from "~/hooks/activities";
import { type ActivityWithCompletions } from "~/hooks/server-activities";

interface ActivityListItemProps {
  activity: ActivityWithCompletions;
}

export default function ActivityListItem(props: ActivityListItemProps) {
  const { activity, complete, isCompleted, latestCompletion } = useActivity({
    activity: props.activity,
  });

  return (
    <Box sx={{ mb: 1, py: 2 }}>
      <Box
        component={Typography}
        variant="h3"
        sx={{
          fontWeight: 900,
          fontSize: "1.1rem",
        }}
      >
        {activity.name}
      </Box>
      <Typography
        variant="body1"
        sx={{
          mt: 1,
        }}
      >
        {activity.description}
      </Typography>

      <RelativeDate date={latestCompletion?.completedAt} />

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        {isCompleted ? (
          <Button
            variant="contained"
            sx={{ flex: 1, py: 1 }}
            startIcon={<Check />}
          >
            完了
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{ flex: 1, py: 1 }}
            startIcon={<Check />}
            onClick={complete}
          />
        )}
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
  );
}
