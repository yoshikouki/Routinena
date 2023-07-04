"use client";

import { Button } from "@mui/material";
import { Login } from "@mui/icons-material";
import { type ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const LoginButton = ({children = "ログイン"}: Props) => {
  return (
    <Button href={"/api/auth/signin"} variant="contained" startIcon={<Login />}>
      {children}
    </Button>
  );
};

export default LoginButton;
