"use client";

import { DarkMode, LightMode, Logout, Settings } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useColorScheme,
} from "@mui/material";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState, type ReactNode } from "react";

interface AppHeaderMenuProps {
  children: ReactNode;
  user: Session["user"];
}

export const AppHeaderMenu = ({ children, user }: AppHeaderMenuProps) => {
  const { mode, setMode } = useColorScheme();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openMenu = Boolean(anchorEl);
  const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const onToggleThemeMode = () => setMode(mode === "light" ? "dark" : "light");
  const onSignOut = () => void signOut({ callbackUrl: "/" });

  return (
    <Box>
      <Tooltip title={user.name || "Menu"}>
        <IconButton
          id="header-menu-button"
          onClick={onOpenMenu}
          sx={{ py: 2, px: 0 }}
          aria-controls={openMenu ? "header-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
        >
          {children}
        </IconButton>
      </Tooltip>

      <Menu
        id="header-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={onCloseMenu}
        MenuListProps={{
          "aria-labelledby": "header-menu-button",
        }}
      >
        <MenuItem onClick={onCloseMenu} sx={{ px: 4, py: 2 }}>
          <Settings />
          <Typography sx={{ ml: 1 }}>設定</Typography>
        </MenuItem>

        <MenuItem
          onClick={onToggleThemeMode}
          sx={{ px: 4, py: 2 }}
        >
          {mode === "light" ? <LightMode /> : <DarkMode />}
          <Typography sx={{ ml: 1 }}>テーマ変更</Typography>
        </MenuItem>

        <MenuItem
          onClick={onSignOut}
          sx={{ px: 4, py: 2 }}
        >
          <Logout />
          <Typography sx={{ ml: 1 }}>ログアウト</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
