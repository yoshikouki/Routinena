"use client";

import { Container } from "@mui/material";
import { type ReactNode } from "react";
import AppHeader from "./AppHeader";
import AppBottomNavigation from "./AppBottomNavigation";

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <Container maxWidth="md">
      <AppHeader />
      <AppBottomNavigation />

      {children}
    </Container>
  );
};

export default AppLayout;
