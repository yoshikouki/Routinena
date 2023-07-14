"use client";

import { Button, type ButtonProps } from "@mui/material";
import { type ReactNode } from "react";
import HomeIcon from "@mui/icons-material/Home";

interface Props {
  children?: ReactNode;
  props?: ButtonProps;
}

const DashboardButton = ({ children = "Dashboard", props = {} }: Props) => {
  return (
    <Button href={"/dashboard"} {...props} startIcon={<HomeIcon />}>
      {children}
    </Button>
  );
};

export default DashboardButton;
