"use client";

import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useColorScheme,
} from "@mui/material";
import { DarkMode, LightMode, Logout, Settings } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";

import AppLogo from "./AppLogo";
import { useState } from "react";

const AppHeader = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { data: session } = useSession({ required: true });
  const { mode, setMode } = useColorScheme();
  const modeString = mode === "light" ? "dark" : "light";

  return (
    <AppBar color="transparent" sx={{ boxShadow: "none" }}>
      <Container maxWidth="md">
        <Toolbar disableGutters={true}>
          <AppLogo />

          <Box sx={{ flexGrow: 1 }} />

          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={() => setOpenMenu(true)} sx={{ p: 0 }}>
                <Avatar
                  alt={session?.user?.name || ""}
                  src={session?.user?.image || ""}
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(openMenu)}
              onClose={() => setOpenMenu(false)}
            >
              <MenuItem onClick={() => setOpenMenu(false)}>
                <Settings />
                <Typography sx={{ ml: 1 }}>設定</Typography>
              </MenuItem>
              <MenuItem onClick={() => setMode(modeString)}>
                {mode === "light" ? <LightMode /> : <DarkMode />}
                <Typography sx={{ ml: 1 }}>テーマ変更</Typography>
              </MenuItem>
              <MenuItem onClick={() => void signOut({ callbackUrl: "/" })}>
                <Logout />
                <Typography sx={{ ml: 1 }}>ログアウト</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;
