"use client";

import { AccessTime } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { getRelativeDate } from "~/utils/date";

export const RelativeDate = ({date}: {date: Date | null | undefined}) => {
  if (!date) return null;

  const relativeDateString = getRelativeDate(date);

  return (
    <Typography
      variant="body2"
      sx={(theme) => ({ mt: 1, color: theme.vars.palette.text.secondary })}
    >
      <AccessTime
        sx={(theme) => ({
          fontSize: theme.typography.body2.fontSize,
          verticalAlign: "middle",
          mr: 1,
        })}
      />
      {relativeDateString}
    </Typography>
  )
};
