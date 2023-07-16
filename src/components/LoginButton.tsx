"use client";

import { Button, type ButtonProps } from "@mui/material";
import { Google, Login } from "@mui/icons-material";
import { type ReactNode } from "react";
import { signIn } from "next-auth/react";

interface Props {
  children?: ReactNode;
  provider?: string;
  callbackUrl?: string;
  props?: ButtonProps;
}

const LoginButton = ({
  children = "ログイン",
  props = {},
  provider = undefined,
  callbackUrl = "/dashboard",
}: Props) => {
  const getIcon = () => {
    switch (provider) {
      case "google":
        return <Google />;
      default:
        return <Login />;
    }
  }

  return (
    <Button
      onClick={() => void signIn(provider, { callbackUrl })}
      startIcon={getIcon()}
      {...props}
    >
      {children}
    </Button>
  );
};

export default LoginButton;
