import { Container } from "@mui/material";
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
    <Container maxWidth="md">
      <AppHeader session={session} />
      <AppBottomNavigation />

      {children}
    </Container>
  );
};

export default AppLayout;
