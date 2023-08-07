"use client";

import { Fab, Zoom, styled, useTheme } from "@mui/material";
import { useBottomFab } from "~/hooks/bottom-fab";

const BottomFab = styled(Fab)({
  position: "absolute",
  zIndex: 10,
  bottom: 40,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export const BottomAnimationFab = () => {
  const theme = useTheme();
  const { current } = useBottomFab();
  const { icon: FabIcon, props: fabProps } = current;

  return (
    <Zoom
      in={!!current}
      timeout={{
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
      }}
    >
      <BottomFab size="large" color="primary" {...fabProps}>
        <FabIcon />
      </BottomFab>
    </Zoom>
  );
};
