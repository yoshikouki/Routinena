"use client";

import { Button } from "@mui/material";
import { type ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const DashboardButton = ({ children = "Dashboard" }: Props) => {
  return <Button href={"/dashboard"}>{children}</Button>;
};

export default DashboardButton;
