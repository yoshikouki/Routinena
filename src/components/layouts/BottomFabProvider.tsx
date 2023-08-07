"use client";

import { createContext, type ReactNode } from "react";
import {
  initialBottomFab,
  useBottomFabContext,
  type UseBottomFabContext,
} from "~/hooks/bottom-fab-context";

export const BottomFabContext = createContext<UseBottomFabContext>({
  current: initialBottomFab.current,
  setBottomFab: () => undefined,
  setDefaultBottomFab: () => undefined,
});

export const BottomFabProvider = ({ children }: { children: ReactNode }) => {
  const bottomFabContext = useBottomFabContext();

  return (
    <BottomFabContext.Provider value={bottomFabContext}>
      {children}
    </BottomFabContext.Provider>
  );
};
