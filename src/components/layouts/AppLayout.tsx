"use client";

import { BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material";
import { type SyntheticEvent, useState } from "react";
import { type ReactNode } from "react";
import HomeIcon from "@mui/icons-material/Home";
import DoneIcon from "@mui/icons-material/Done";
import AnimationBottomFab from "./AnimationBottomFab";

interface Props {
  children: ReactNode;
}

const navigationActions = {
  home: {
    label: "Home",
    value: "dashboard",
    icon: <HomeIcon />,
  },
  done: {
    label: "Done",
    value: "done",
    icon: <DoneIcon />,
  },
}

const AppLayout = ({ children }: Props) => {
  const [value, setValue] = useState(navigationActions.home.value);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Paper
        sx={{ position: "fixed", bottom: 40, left: 8, right: 8 }}
        elevation={8}
      >
        <BottomNavigation value={value} onChange={handleChange}>
          {Object.values(navigationActions).map((action) => (
            <BottomNavigationAction key={action.value} {...action} />
          ))}
        </BottomNavigation>

        <AnimationBottomFab />
      </Paper>

      {children}
    </Box>
  );
};

export default AppLayout;
