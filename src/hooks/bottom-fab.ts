"use client";

import { useContext, useEffect } from "react";
import { BottomFabContext } from "~/components/layouts/BottomFabProvider";
import { type BottomFab } from "./bottom-fab-context";

export const useBottomFab = (props?: BottomFab) => {
  const buttonFabContext = useContext(BottomFabContext);
  useEffect(
    () => {
      if (props) {
        buttonFabContext.setBottomFab(props);
      }
      return buttonFabContext.setDefaultBottomFab;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return {
    ...buttonFabContext,
  };
};
