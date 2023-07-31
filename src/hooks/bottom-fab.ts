"use client";

import AddIcon from "@mui/icons-material/Add";
import { type FabProps, type SvgIcon } from "@mui/material";
import { useReducer } from "react";

const bottomFabVariations = {
  newActivity: {
    icon: AddIcon,
    props: {
      "aria-label": "add",
      href: "/activities/new",
    },
  },
};

const initialBottomFab = {
  current: bottomFabVariations.newActivity,
  ...bottomFabVariations,
};

type BottomFab = {
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

export const useBottomFab = () => {
  const [bottomFab, dispatch] = useReducer(reducer, initialBottomFab);

  const setDefaultBottomFab = () => dispatch({ type: "toDefault" });
  const setBottomFab = (bottomFab: BottomFab) =>
    dispatch({ type: "set", ...bottomFab });

  return {
    current: bottomFab.current,
    setBottomFab,
    setDefaultBottomFab,
  };
};
