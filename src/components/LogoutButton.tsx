"use client";

import { Button } from "@mui/material";
import { Login, Logout } from "@mui/icons-material";
import { type ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const LogoutButton = ({ children = "ログアウト" }: Props) => {
  return (
    <Button
      href={"/api/auth/signout"}
      variant="contained"
      startIcon={<Logout />}
    >
      {children}
    </Button>
  );
};

export default LogoutButton;
