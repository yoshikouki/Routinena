"use client";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ThemeModeToggleButton from "./ThemeModeToggleButton";
import LoginButton from "../LoginButton";
import { useSession } from "next-auth/react";
import DashboardButton from "../DashboardButton";

const LandingPageHeader = () => {
  const { data: session } = useSession();

  return (
    <AppBar color="default">
      <Box sx={{ flex: "display" }}>
        <Toolbar>
          <RotateLeftIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ルーティンナさん
          </Typography>

          <ThemeModeToggleButton />
          <Box sx={{ flexGrow: 0 }}>
            {session ? <DashboardButton /> : <LoginButton />}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default LandingPageHeader;
