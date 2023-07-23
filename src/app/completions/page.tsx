import { Box, Container, Typography } from "@mui/material";
import { type Metadata } from "next";
import { RelativeDate } from "~/components/RelativeDate";
import { useServerSession } from "~/hooks/server-session";
import { completionsService } from "~/server/services/completions";

export const metadata: Metadata = {
  title: "活動の作成 - ルーティンナさん | Routinena",
};

export default async function CompletionsPage() {
  const session = await useServerSession.get();
  const completions = await completionsService().getAll(session.user.id);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        mt: 10,
        padding: 0,
        gap: 4,
      }}
    >
      <Box>
        <Typography
          component="h1"
          sx={{
            fontWeight: 900,
            fontSize: 30,
          }}
        >
          実績
        </Typography>
      </Box>

      <Box sx={{ py: 2 }}>
        {completions.length === 0 && (
          <Typography variant="body1">実績がありません</Typography>
        )}

        {completions.map((completion) => (
          <Box key={completion.id} sx={{ mb: 3 }}>

            <Typography
              variant="h2"
              sx={{ fontWeight: 900, fontSize: "1.2rem", mt: 1 }}
            >
              {completion.activity.name}
            </Typography>

            <RelativeDate date={completion.completedAt} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
