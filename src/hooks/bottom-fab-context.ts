"use client";

import { Close } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { type FabProps, type SvgIcon } from "@mui/material";
import { useCallback, useEffect, useReducer, useState } from "react";

type InitializeBottomFabProps = {
  onClickNewActivity: () => void;
  onClickCloseNewActivity: () => void;
};

const generateBottomFabVariations = (
  props?: InitializeBottomFabProps,
): Record<"newActivity" | "closeNewActivity", BottomFab> => ({
  newActivity: {
    icon: AddIcon,
    props: {
      onClick: props ? props.onClickNewActivity : () => undefined,
      "aria-label": "add",
      color: "primary",
    },
  },
  closeNewActivity: {
    icon: Close,
    props: {
      onClick: props ? props.onClickCloseNewActivity : () => undefined,
      "aria-label": "add",
      color: "secondary",
    },
  },
});

export const generateInitialBottomFab = (props?: InitializeBottomFabProps) => {
  const bottomFabVariations = generateBottomFabVariations(props);
  return {
    current: bottomFabVariations.newActivity,
    ...bottomFabVariations,
  };
};

export type BottomFab = {
  icon: typeof SvgIcon;
  props: FabProps;
};

type BottomFabVariationKeys = keyof ReturnType<
  typeof generateBottomFabVariations
>;

type BottomFabManager = Record<
  keyof ReturnType<typeof generateInitialBottomFab>,
  BottomFab
>;

type BottomFabReducerAction =
  | {
      type: "toDefault";
    }
  | {
      type: "initialize";
      bottomFab: BottomFabManager;
    }
  | {
      type: "select";
      key: BottomFabVariationKeys;
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
        current: bottomFab.newActivity,
      };
    case "initialize":
      return action.bottomFab;
    case "select":
      return {
        ...bottomFab,
        current: bottomFab[action.key],
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
  const [openNewActivity, setOpenNewActivity] = useState(false);
  const [bottomFab, dispatch] = useReducer(reducer, generateInitialBottomFab());

  const setDefaultBottomFab = useCallback(
    () => dispatch({ type: "toDefault" }),
    [],
  );
  const setBottomFab = useCallback(
    (bottomFab: BottomFab) => dispatch({ type: "set", ...bottomFab }),
    [],
  );
  const onOpenNewActivity = useCallback(() => {
    setOpenNewActivity(true);
    dispatch({ type: "select", key: "closeNewActivity" });
  }, [dispatch]);
  const onCloseNewActivity = useCallback(() => {
    setOpenNewActivity(false);
    setDefaultBottomFab();
  }, [setDefaultBottomFab]);

  useEffect(
    () => {
      const bottomFab = generateInitialBottomFab({
        onClickNewActivity: onOpenNewActivity,
        onClickCloseNewActivity: onCloseNewActivity,
      });
      dispatch({
        type: "initialize",
        bottomFab,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    current: bottomFab.current,
    setBottomFab,
    setDefaultBottomFab,
    openNewActivity,
    onCloseNewActivity,
  };
};
export type UseBottomFabContext = ReturnType<typeof useBottomFabContext>;
