"use client";

import { Fab, Zoom, styled, useTheme } from "@mui/material";
import { useBottomFab } from "~/hooks/bottom-fab";

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
      <BottomFab {...fabProps}>
        <FabIcon />
      </BottomFab>
    </Zoom>
  );
};

export default AnimationBottomFab;
