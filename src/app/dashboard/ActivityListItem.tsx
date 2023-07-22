"use client";

import { Box, Button, Typography } from "@mui/material";
import { Check, Dehaze } from "@mui/icons-material";

import { type ActivitiesWithCompletions } from "~/hooks/server-activities";
import Link from "next/link";
import { useActivity } from "~/hooks/activities";
import { AccessTime } from "@mui/icons-material";

interface ActivityListItemProps {
  activity: ActivitiesWithCompletions;
}

export default function ActivityListItem(props: ActivityListItemProps) {
  const { activity, complete, isCompleted, getTimeFromLatestCompletion } =
    useActivity({
      activity: props.activity,
    });
  const timeFromLatestCompletion = getTimeFromLatestCompletion();

  return (
    <Box sx={{ mb: 1, py: 2 }}>
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

      {timeFromLatestCompletion && (
        <Typography
          variant="body2"
          sx={(theme) => ({ mt: 1, color: theme.vars.palette.text.secondary })}
        >
          <AccessTime
            sx={(theme) => ({
              fontSize: theme.typography.body2.fontSize,
              verticalAlign: "middle",
              mr: 1,
            })}
          />
          {timeFromLatestCompletion}
        </Typography>
      )}

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
