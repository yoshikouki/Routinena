import { Box, Typography } from "@mui/material";
import { type Metadata } from "next";
import { RelativeDate } from "~/components/RelativeDate";
import { useServerSession } from "~/hooks/server-session";
import { completionsService } from "~/server/services/completions";

export const metadata: Metadata = {
  title: "活動の作成 - ルーティンナさん | Routinena",
};

const useServerCompletions = {
  getAll: async () => {
    const session = await useServerSession.get();
    return await completionsService().getAll(session.user.id);
  },
};

export default async function CompletionsPage() {
  const completions = await useServerCompletions.getAll();

  return (
    <>
      <Box>
        <Typography variant="h1">実績</Typography>
      </Box>

      <Box sx={{ py: 2 }}>
        {completions.length === 0 && (
          <Typography variant="body1">実績がありません</Typography>
        )}

        {completions.map((completion) => (
          <Box key={completion.id} sx={{ mb: 3 }}>
            <Typography
              component="h2"
              sx={{ mt: 1 }}
            >
              {completion.activity.name}
            </Typography>

            <RelativeDate date={completion.completedAt} />
          </Box>
        ))}
      </Box>
    </>
  );
}
