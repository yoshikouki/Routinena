"use client";

import type {} from "@mui/material/themeCssVarsAugmentation"; // Workaround for theme type errors with CSS theme variables

import { Fab, Zoom, styled, useTheme } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

const BottomFab = styled(Fab)(({ theme }) => ({
  position: "absolute",
  zIndex: 10,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
  backgroundColor: theme.vars.palette.primary.main,
}));

const AnimationBottomFab = () => {
  const theme = useTheme();
  return (
    <Zoom
      in={true}
      timeout={{
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
      }}
    >
      <BottomFab
        aria-label="add"
        href="/activities/new"
      >
        <AddIcon />
      </BottomFab>
    </Zoom>
  );
};

export default AnimationBottomFab;
