"use client";

import { Box, Paper, Typography, useColorScheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import type {} from "@mui/material/themeCssVarsAugmentation"; // Workaround for theme type errors with CSS theme variables
import { ResponsiveTimeRange } from "@nivo/calendar";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useCompletions } from "~/hooks/completions";

export function CompletionsCalendarHeatmap() {
  const toDate = new Date();
  const displayDays = 77 + toDate.getDay();
  const fromDate = new Date(
    toDate.getTime() - displayDays * 24 * 60 * 60 * 1000,
  );
  const { mode } = useColorScheme();

  const { dailyCompletions } = useCompletions();
  const data = Object.entries(dailyCompletions).reduce(
    (acc, [date, completionsObject]) => {
      return [
        {
          day: date,
          value: completionsObject.completions.length,
        },
        ...acc,
      ];
    },
    [] as { day: string; value: number }[],
  );

  return (
    <Box sx={{ mx: 2, height: 200 }}>
      <ResponsiveTimeRange
        data={data}
        from={format(fromDate, "yyyy-MM-dd")}
        to={format(toDate, "yyyy-MM-dd")}
        margin={{ top: 0, right: 0, bottom: 0, left: 1 }}
        emptyColor={mode === "dark" ? grey[900] : grey[100]}
        dayBorderWidth={1}
        dayBorderColor={mode === "dark" ? grey[800] : grey[200]}
        weekdayTicks={[]}
        weekdayLegendOffset={0}
        tooltip={(e) => {
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
                {/* "2023-01-01" を 2023-01-01 (月) の形式に変換 */}
                {format(new Date(e.day), "yyyy-MM-dd (eee)", { locale: ja })}
              </Box>
              <Box>
                <Typography sx={{ fontWeight: "bold" }} color="primary">
                  +{e.value}
                </Typography>
              </Box>
            </Paper>
          );
        }}
      />
    </Box>
  );
}
