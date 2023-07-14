"use client";

import LoginButton from "./LoginButton";
import DashboardButton from "./DashboardButton";
import { useSession } from "next-auth/react";

const SessionButton = () => {
  const { data: session } = useSession();

  return session ? <DashboardButton /> : <LoginButton />;
};

export default SessionButton;
