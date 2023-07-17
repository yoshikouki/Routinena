"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { type BuiltInProviderType } from "next-auth/providers";
import { type ClientSafeProvider, type LiteralUnion } from "next-auth/react/types";
import LoginButton from "~/components/LoginButton";

export default function Login({ providers }: {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;
}) {
  return (
    <Container maxWidth="sm" sx={{ display: "flex", height: "100vh", flexDirection: "column", justifyContent: "center" }}>
      <Box sx={{  }}>
        <Typography
            component="h1"
            sx={{
              fontWeight: 900,
              fontSize: 30,
            }}
          >
            登録 / ログイン
          </Typography>

      </Box>
      <Box sx={{ mt: 4 }}>
        {Object.values(providers).map((provider) => (
          <Box key={provider.name}>
            <LoginButton
              provider={provider.id}
              props={{
                variant: "contained",
                color: "primary",
                size: "large",
                sx: {
                  minWidth: 300,
                  width: "100%",
                  padding: 3
                },
              }}
            >
              {provider.name}アカウントでログイン
            </LoginButton>
          </Box>
        ))}

        <Box sx={{ mt: 4 }}>
          <Button
            href="/"
            variant="outlined"
            size="large"
            sx={{
              minWidth: 300,
              width: "100%",
              padding: 2,
            }}
          >
            キャンセル
          </Button>
        </Box>
      </Box>
      <Box />
    </Container>
  );
}
