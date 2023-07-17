"use client";

import { type BuiltInProviderType } from "next-auth/providers";
import { type ClientSafeProvider, type LiteralUnion } from "next-auth/react/types";
import LoginButton from "~/components/LoginButton";

export default function Login({ providers }: {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <LoginButton provider={provider.id} props={{
            variant: "contained",
            color: "primary",
            size: "large",
            sx: {
              minWidth: 300,
              padding: 2
            },
          }}>
            {provider.name}アカウントでログイン
          </LoginButton>
        </div>
      ))}
    </main>
  );
}
