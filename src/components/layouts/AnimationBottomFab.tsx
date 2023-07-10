"use client";

import { Fab, Zoom, useTheme } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

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
      <Fab
        sx={{
          position: "absolute",
          zIndex: 10,
          top: -30,
          left: 0,
          right: 0,
          margin: "0 auto",
        }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Zoom>
  );
};

export default AnimationBottomFab;
