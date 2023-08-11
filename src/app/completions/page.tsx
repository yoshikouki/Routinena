import { Box, Typography } from "@mui/material";
import { type Metadata } from "next";
import Completions from "./Completions";

export const metadata: Metadata = {
  title: "活動の履歴 - ルーティンナさん | Routinena",
};

export default function CompletionsPage() {
  return (
    <>
      <Box sx={{ mx: 2 }}>
        <Typography variant="h1">履歴</Typography>
      </Box>

      <Completions />
    </>
  );
}
