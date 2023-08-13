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
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { RelativeDate } from "~/components/RelativeDate";

import { useCompletions } from "~/hooks/completions";

export default function Completions() {
  const { completions, isLoading } = useCompletions();

  return (
    <>
      {isLoading && (
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
            px: 2,
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

      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          px: 2,
        }}
      >
        {completions.map((completion) => (
          <TimelineItem key={completion.id}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector sx={{ opacity: 0.3 }} />
            </TimelineSeparator>
            <TimelineContent sx={{ pb: 3, pr: 0 }}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flex: 1 }}>
                  <RelativeDate date={completion.completedAt} />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={(theme) => ({
                      color: theme.vars.palette.text.secondary,
                      fontSize: theme.typography.body2.fontSize,
                    })}
                  >
                    {/* 時刻まで表示する */}
                    {format(completion.completedAt, "yyyy-MM-dd (eee) HH:mm", {
                      locale: ja,
                    })}
                  </Typography>
                </Box>
              </Box>
              {completion.activity.name}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  );
}
