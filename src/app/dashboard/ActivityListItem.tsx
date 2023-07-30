"use client";

import { Check, Dehaze } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import { RelativeDate } from "~/components/RelativeDate";
import { useActivity, type ActivityModel } from "~/hooks/activities";

interface ActivityListItemProps {
  activity: ActivityModel;
}

export default function ActivityListItem(props: ActivityListItemProps) {
  const { activity, complete, isCompleting, isCompleted, latestCompletion } =
    useActivity({
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
          <LoadingButton
            variant="outlined"
            sx={{ flex: 1, py: 1 }}
            startIcon={<Check />}
            onClick={complete}
            loading={isCompleting}
          />
        )}

        <Button
          onClick={() => props.activity.onShow()}
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
