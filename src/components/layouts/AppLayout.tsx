import { Container } from "@mui/material";
import { type Session } from "next-auth";
import { type ReactNode } from "react";
import AppBottomNavigation from "./AppBottomNavigation";
import AppHeader from "./AppHeader";
import { BottomFabProvider } from "./BottomFabProvider";
import { NewActivityModal } from "./NewActivityModal";

interface Props {
  children: ReactNode;
  session: Session;
}

const AppLayout = ({ children, session }: Props) => {
  return (
    <BottomFabProvider>
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
        <NewActivityModal />
      </Container>
    </BottomFabProvider>
  );
};

export default AppLayout;
