"use client";

import { Box, Fade, Paper, Skeleton, Typography, Zoom } from "@mui/material";

import { useCompletions } from "~/hooks/completions";
import { CompletionsLineChart } from "./CompletionsLineChart";

export default function Summary() {
  const { completions, last24HoursCompletions, isLoading, isFetching } =
    useCompletions();

  return (
    <Box sx={{ px: 2, height: 200 }}>
      {isLoading && <Skeleton variant="rounded" sx={{ height: "100%" }} />}

      <Fade in={!isLoading}>
        <Paper
          sx={{
            position: "relative",
            display: "flex",
            height: "100%",
          }}
        >
          <CompletionsLineChart />
          <Box sx={{ position: "absolute", px: 3, py: 4 }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Typography variant="body1">Total</Typography>
              {last24HoursCompletions.length > 0 && (
                <Zoom in={!isFetching}>
                  <Typography variant="body1" color="primary" sx={{ pl: 0.5 }}>
                    Today
                  </Typography>
                </Zoom>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
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
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}
