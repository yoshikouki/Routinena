"use client";

import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import { createContext, type ReactNode } from "react";
import {
  useBottomFabContext,
  type UseBottomFabContext,
} from "~/hooks/bottom-fab-context";

export const BottomFabContext = createContext<UseBottomFabContext>({
  current: { icon: HourglassFullIcon, props: {} },
  setBottomFab: () => undefined,
  setDefaultBottomFab: () => undefined,
  openNewActivity: false,
  onCloseNewActivity: () => undefined,
});

export const BottomFabProvider = ({ children }: { children: ReactNode }) => {
  const bottomFabContext = useBottomFabContext();

  return (
    <BottomFabContext.Provider value={bottomFabContext}>
      {children}
    </BottomFabContext.Provider>
  );
};
