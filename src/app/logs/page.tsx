import { Box, Typography } from "@mui/material";
import { type Metadata } from "next";
import Completions from "./Completions";
import { CompletionsCalendarHeatmap } from "./CompletionsCalendarHeatmap";

export const metadata: Metadata = {
  title: "活動の履歴 - ルーティンナさん | Routinena",
};

export default function LogsPage() {
  return (
    <>
      <CompletionsCalendarHeatmap />

      <Box sx={{ mx: 2, mt: 4 }}>
        <Typography variant="h1">履歴</Typography>
      </Box>

      <Completions />
    </>
  );
}
