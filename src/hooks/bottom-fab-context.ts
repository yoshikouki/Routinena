"use client";

import AddIcon from "@mui/icons-material/Add";
import { type FabProps, type SvgIcon } from "@mui/material";
import { useCallback, useReducer } from "react";

const bottomFabVariations = {
  newActivity: {
    icon: AddIcon,
    props: {
      "aria-label": "add",
      href: "/activities/new",
    },
  },
};

export const initialBottomFab = {
  current: bottomFabVariations.newActivity,
  ...bottomFabVariations,
};

export type BottomFab = {
  icon: typeof SvgIcon;
  props: FabProps;
};

type BottomFabManager = Record<keyof typeof initialBottomFab, BottomFab>;

type BottomFabReducerAction =
  | {
      type: "toDefault";
    }
  | ({
      type: "set";
    } & BottomFab);

const reducer = (
  bottomFab: BottomFabManager,
  action: BottomFabReducerAction,
) => {
  switch (action.type) {
    case "toDefault":
      return {
        ...bottomFab,
        current: bottomFabVariations.newActivity,
      };
    case "set":
      return {
        ...bottomFab,
        current: {
          icon: action.icon,
          props: action.props,
        },
      };
  }
};

export const useBottomFabContext = () => {
  const [bottomFab, dispatch] = useReducer(reducer, initialBottomFab);

  const setDefaultBottomFab = useCallback(
    () => dispatch({ type: "toDefault" }),
    [],
  );
  const setBottomFab = useCallback(
    (bottomFab: BottomFab) => dispatch({ type: "set", ...bottomFab }),
    [],
  );

  return {
    current: bottomFab.current,
    setBottomFab,
    setDefaultBottomFab,
  };
};
export type UseBottomFabContext = ReturnType<typeof useBottomFabContext>;
