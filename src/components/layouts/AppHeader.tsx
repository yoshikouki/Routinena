"use client";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AppHeader = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { data: session } = useSession({ required: true });

  return (
    <AppBar>
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

          <Box sx={{ flexGrow: 0 }}>
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
                <Typography textAlign="center">設定</Typography>
              </MenuItem>
              <MenuItem onClick={() => setOpenMenu(false)}>
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>
              <MenuItem onClick={() => void signOut()}>
                <Typography textAlign="center">ログアウト</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default AppHeader;
