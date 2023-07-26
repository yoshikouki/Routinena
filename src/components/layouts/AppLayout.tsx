import { Box, Container } from "@mui/material";
import { type ReactNode } from "react";
import AppHeader from "./AppHeader";
import AppBottomNavigation from "./AppBottomNavigation";
import { type Session } from "next-auth";

interface Props {
  children: ReactNode;
  session: Session;
}

const AppLayout = ({ children, session }: Props) => {
  return (
    <Container
      sx={{
        maxWidth: "md",
        height: "100vh",
        overflow: "auto",
        pt: 12,
        pb: 12,
        gap: 4,
      }}
    >
      {children}

      <AppHeader session={session} />
      <AppBottomNavigation />
    </Container>
  );
};

export default AppLayout;
