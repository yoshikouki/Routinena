"use client";

import { Box, Grid, Typography } from "@mui/material";

import DashboardButton from "~/components/DashboardButton";
import InstallationButton from "./InstallationButton";
import LoginButton from "~/components/LoginButton";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Box component="main" sx={{ mt: 12 }}>
        <Box sx={{ mt: 15 }}>
          <Typography variant="h1" sx={{ letterSpacing: ".2rem" }}>
            ルーティンナさん
          </Typography>
        </Box>
        <Box sx={{ mt: 8 }}>
          <Typography variant="subtitle1" sx={{ fontSize: "1.5rem" }}>
            日々の用事を、
            <br />
            もっと手軽に、もっと楽しく
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mt: 8 }}>
          <Grid item xs={12} sm={6} md={6}>
            {session ? (
              <DashboardButton
                props={{
                  variant: "contained",
                  sx: { width: "100%", py: 3 },
                }}
              />
            ) : (
              <LoginButton
                props={{
                  variant: "contained",
                  sx: { width: "100%", py: 3 },
                }}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <InstallationButton
              props={{
                variant: "contained",
                sx: { width: "100%", py: 3 },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
