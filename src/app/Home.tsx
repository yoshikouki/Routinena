"use client";

import { Typography, Box } from "@mui/material";
import DashboardButton from "~/components/DashboardButton";
import LoginButton from "~/components/LoginButton";
import InstallationButton from "./InstallationButton";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <main>
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
          {session ? <DashboardButton /> : <LoginButton />}
        </Box>
        <InstallationButton />
      </main>
    </>
  );
}
