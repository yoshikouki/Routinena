"use client";

import { Box } from "@mui/material";
import { type ReactNode } from "react";
import LandingPageHeader from "./LandingPageHeader";

interface Props {
  children: ReactNode;
}

const LandingPageLayout = ({ children }: Props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <LandingPageHeader />
      {children}
    </Box>
  );
};

export default LandingPageLayout;
