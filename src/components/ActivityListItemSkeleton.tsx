"use client";

import { Skeleton, styled } from "@mui/material";

export const ActivityListItemSkeleton = styled(Skeleton)(({ theme }) => ({
  height: 150,
  borderRadius: theme.vars.shape.borderRadius,
}));
