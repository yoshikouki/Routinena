"use client";

import { Box, Paper, Typography } from "@mui/material";
import { linearGradientDef } from "@nivo/core";
import { ResponsiveLine } from "@nivo/line";
import { useCompletions, type Completions } from "~/hooks/completions";

export function CompletionsLineChart() {
  const { dailyCompletions, completions } = useCompletions();
  const maxCount = completions.length;
  const data = Object.entries(dailyCompletions).reduce(
    (acc, [date, completionsObject]) => {
      const dailyTotalCount =
        acc[0] === undefined ? maxCount : acc[0].y - acc[0].completions.length;
      return [
        {
          x: date,
          y: dailyTotalCount,
          completions: completionsObject.completions,
        },
        ...acc,
      ];
    },
    [] as { x: string; y: number; completions: Completions }[],
  );

  return (
    <ResponsiveLine
      data={[
        {
          id: "completions",
          data,
        },
      ]}
      colors={{ scheme: "oranges" }}
      margin={{ top: 20, right: 0, bottom: 12, left: 0 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisLeft={null}
      axisBottom={null}
      enableGridX={false}
      enableGridY={false}
      lineWidth={0}
      enablePoints={false}
      enableArea={true}
      defs={[
        linearGradientDef("gradient", [
          { offset: 0, color: "inherit" },
          { offset: 80, color: "inherit", opacity: 0.4 },
          { offset: 100, color: "inherit", opacity: 0 },
        ]),
      ]}
      fill={[{ match: "*", id: "gradient" }]}
      areaOpacity={0.2}
      useMesh={true}
      enableSlices="x"
      sliceTooltip={(props) => {
        if (!props.slice.points[0]) return;
        const date = props.slice.points[0].data.x.toString();
        const completionsCount = props.slice.points[0].data.yFormatted;
        return (
          <Paper
            sx={(theme) => ({
              background: theme.vars.palette.background.default,
              opacity: 0.7,
              px: 2,
              py: 2,
            })}
          >
            <Box component={Typography} variant="body2">
              {date}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "bold", mr: 1 }} component="span">
                {completionsCount}
              </Typography>
              {dailyCompletions[date] && (
                <Typography
                  sx={{ fontWeight: "bold" }}
                  color="primary"
                  component="span"
                >
                  +{dailyCompletions[date]?.completions.length}
                </Typography>
              )}
            </Box>
          </Paper>
        );
      }}
      legends={[]}
    />
  );
}
