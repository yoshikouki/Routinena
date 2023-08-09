"use client";

import { AccessTime } from "@mui/icons-material";
import { Typography, type TypeText } from "@mui/material";
import { type Variant } from "@mui/material/styles/createTypography";
import { getRelativeDate } from "~/utils/date";

interface RelativeDateProps {
  date: Date | null | undefined;
  typeText?: keyof TypeText;
  iconVariant?: Variant;
  variant?: Variant;
}

export const RelativeDate = (props: RelativeDateProps) => {
  if (!props.date) return null;

  const relativeDateString = getRelativeDate(props.date);

  return (
    <Typography
      sx={(theme) => ({
        color: props.typeText
          ? theme.vars.palette.text[props.typeText]
          : theme.vars.palette.text.secondary,
        fontSize: props.variant
          ? theme.typography[props.variant].fontSize
          : theme.typography.body2.fontSize,
      })}
    >
      <AccessTime
        sx={(theme) => ({
          fontSize: props.iconVariant
            ? theme.typography[props.iconVariant].fontSize
            : theme.typography.body2.fontSize,
          verticalAlign: "middle",
          mr: 0.5,
        })}
      />
      {relativeDateString}
    </Typography>
  );
};
