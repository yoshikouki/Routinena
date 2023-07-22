"use client";

import { Box, Button, Typography } from "@mui/material";
import { Check, Dehaze } from "@mui/icons-material";

import Link from "next/link";
import { type Activity } from "@prisma/client";
import { useActivity } from "~/hooks/activities";

interface ActivityListItemProps {
  activity: Activity
}

export default function ActivityListItem(props: ActivityListItemProps) {
  const { activity } = useActivity({ activity: props.activity });

  return (
    <Box sx={{ mb: 1, py: 2 }}>
      <Box
        component={Typography}
        variant="h3"
        sx={{ fontWeight: 900, fontSize: "1.1rem" }}
      >
        {activity?.name}
      </Box>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {activity?.description}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          sx={{ flex: 1, py: 1 }}
          startIcon={<Check />}
        >
          完了
        </Button>
        <Button
          LinkComponent={Link}
          href={`/activities/${activity?.id}`}
          startIcon={<Dehaze />}
          variant="outlined"
          sx={{ flex: 1, py: 1 }}
        >
          詳細
        </Button>
      </Box>
    </Box>
  );
}
