"use client";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";
import { Box, Skeleton, Typography } from "@mui/material";
import { useCompletions } from "~/hooks/completions";
import { CompletionsTimeline } from "../../components/CompletionsTimeline";

export default function Completions() {
  const { completions, isLoading } = useCompletions();

  return (
    <Box sx={{ mx: 2 }}>
      {isLoading && (
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
            px: 0,
          }}
        >
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector sx={{ opacity: 0.3 }} />
            </TimelineSeparator>
            <TimelineContent sx={{ pb: 3 }}>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector sx={{ opacity: 0.3 }} />
            </TimelineSeparator>
            <TimelineContent sx={{ pb: 3 }}>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      )}

      {!isLoading && completions.length === 0 && (
        <Box component={Typography} variant="body1">
          履歴がありません
        </Box>
      )}

      <CompletionsTimeline completions={completions} />
    </Box>
  );
}
