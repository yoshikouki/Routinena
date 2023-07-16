"use client";

import { AppBar, Box, Container, Toolbar } from "@mui/material";
import ThemeModeToggleButton from "./ThemeModeToggleButton";

const LandingPageHeader = ({ children }: { children?: React.ReactNode }) => {
  return (
    <AppBar color="transparent" sx={{ boxShadow: "none" }}>
      <Container maxWidth="md">
        <Toolbar disableGutters={true}>
          {children}
          <Box sx={{ flexGrow: 1 }} />
          <ThemeModeToggleButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LandingPageHeader;
