"use client";

import { SessionProvider } from "next-auth/react";

export const ClientSessionProvider = (props: React.PropsWithChildren) => (
  <SessionProvider>{props.children}</SessionProvider>
);
