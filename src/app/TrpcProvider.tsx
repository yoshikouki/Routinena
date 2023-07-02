"use client";

import { api } from "~/utils/api";

export const TrpcProvider = api.withTRPC(
  (props: React.PropsWithChildren) => props.children
) as React.ComponentType<React.PropsWithChildren>;
