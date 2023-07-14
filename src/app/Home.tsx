"use client";

import { Typography, Box, Grid } from "@mui/material";
import DashboardButton from "~/components/DashboardButton";
import LoginButton from "~/components/LoginButton";
import InstallationButton from "./InstallationButton";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Box component="main" sx={{ mt: 10 }}>
        <Box sx={{ mt: 15 }}>
          <Typography
            component="h1"
            sx={{
              fontWeight: 900,
              fontSize: 30,
              letterSpacing: ".2rem",
            }}
          >
            ルーティンナさん
          </Typography>
        </Box>
        <Box sx={{ mt: 8 }}>
          <Typography variant="subtitle1" sx={{ fontSize: 25 }}>
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
