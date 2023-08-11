"use client";

import { Box, Typography } from "@mui/material";
import { ActivityListItemSkeleton } from "~/components/ActivityListItemSkeleton";
import { RelativeDate } from "~/components/RelativeDate";

import { useCompletions } from "~/hooks/completions";

export default function Completions() {
  const { completions, isLoading } = useCompletions();

  return (
    <Box sx={{ mx: 2, mt: 2 }}>
      {isLoading && <ActivityListItemSkeleton />}

      {!isLoading && (!completions || completions.length) === 0 && (
        <Typography variant="body1">履歴がありません</Typography>
      )}

      {completions?.map((completion) => (
        <Box key={completion.id} sx={{ mb: 3 }}>
          <Typography component="h2" sx={{ mt: 1 }}>
            {completion.activity.name}
          </Typography>

          <RelativeDate date={completion.completedAt} />
        </Box>
      ))}
    </Box>
  );
}
