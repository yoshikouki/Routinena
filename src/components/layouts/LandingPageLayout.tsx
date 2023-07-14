"use client";

import { Container } from "@mui/material";
import { type ReactNode } from "react";
import LandingPageHeader from "./LandingPageHeader";

interface Props {
  children: ReactNode;
}

const LandingPageLayout = ({ children }: Props) => {
  return (
    <Container maxWidth="md">
      <LandingPageHeader />
      {children}
    </Container>
  );
};

export default LandingPageLayout;
