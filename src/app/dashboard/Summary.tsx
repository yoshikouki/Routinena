"use client";

import { Box, Paper, Skeleton, Typography, Zoom } from "@mui/material";

import { useCompletions } from "~/hooks/completions";

export default function Summary() {
  const { completions, last24HoursCompletions, isLoading, isFetching } =
    useCompletions();

  return (
    <Box sx={{ height: 100, px: 2 }}>
      {isLoading ? (
        <Skeleton sx={{ height: "100%" }} />
      ) : (
        <Paper
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
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
        </Paper>
      )}
    </Box>
  );
}
