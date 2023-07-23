import { Box, Container, Typography } from "@mui/material";

import { type Metadata } from "next";
import { ActivityForm } from "~/components/ActivityForm";

export const metadata: Metadata = {
  title: "活動の作成 - ルーティンナさん | Routinena",
};

export default function NewActivityPage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        mt: 12,
        padding: 0,
        gap: 4,
      }}
    >
      <Box>
        <Typography variant="h1">活動の作成</Typography>
      </Box>

      <ActivityForm />
    </Container>
  );
}
