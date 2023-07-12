"use client";

import { AppBar, Box, Container, Toolbar } from "@mui/material";
import ThemeModeToggleButton from "./ThemeModeToggleButton";

const LandingPageHeader = () => {
  return (
    <AppBar color="transparent" sx={{ boxShadow: "none" }}>
      <Container maxWidth="md" sx={{ dispaly: "flex" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <ThemeModeToggleButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LandingPageHeader;
