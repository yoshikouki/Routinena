"use client";

import { Button } from "@mui/material";
import { Login } from "@mui/icons-material";
import { type ReactNode } from "react";
import { signIn } from "next-auth/react";

interface Props {
  children?: ReactNode;
}

const LoginButton = ({children = "ログイン"}: Props) => {

  return (
    <Button onClick={() => void signIn()} variant="outlined" startIcon={<Login />}>
      {children}
    </Button>
  );
};

export default LoginButton;
