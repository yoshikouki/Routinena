"use client";

import { Box, Paper, Skeleton, Typography, Zoom } from "@mui/material";

import { useCompletions } from "~/hooks/completions";
import { CompletionsLineChart } from "./CompletionsLineChart";

export default function Summary() {
  const { completions, last24HoursCompletions, isLoading, isFetching } =
    useCompletions();

  return (
    <Box sx={{ px: 2 }}>
      {isLoading ? (
        <Skeleton sx={{ height: "100%" }} />
      ) : (
        <Paper
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            height: 200,
          }}
        >
          <CompletionsLineChart />
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              gap: 1,
              px: 2,
            }}
          >
            <Typography variant="h1" component="p">
              {completions.length}
            </Typography>
            {last24HoursCompletions.length > 0 && (
              <Zoom in={!isFetching}>
                <Typography variant="h1" component="p" color="primary">
                  +{last24HoursCompletions.length}
                </Typography>
              </Zoom>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
}
