"use client";

import { Button, type ButtonProps } from "@mui/material";
import { Login } from "@mui/icons-material";
import { type ReactNode } from "react";
import { signIn } from "next-auth/react";

interface Props {
  children?: ReactNode;
  props?: ButtonProps;
}

const LoginButton = ({ children = "ログイン", props = {} }: Props) => {
  return (
    <Button onClick={() => void signIn()} startIcon={<Login />} {...props}>
      {children}
    </Button>
  );
};

export default LoginButton;
