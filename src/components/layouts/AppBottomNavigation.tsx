import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { type SyntheticEvent, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import DoneIcon from "@mui/icons-material/Done";
import AnimationBottomFab from "./AnimationBottomFab";
import Link from "next/link";

const navigationActions = {
  home: {
    label: "Home",
    value: "dashboard",
    path: "/dashboard",
    icon: <HomeIcon />,
  },
  completions: {
    label: "Completions",
    value: "completions",
    path: "/completions",
    icon: <DoneIcon />,
  },
};

const AppBottomNavigation = () => {
  const [value, setValue] = useState(navigationActions.home.value);

  const handleChange = (event: SyntheticEvent, newValue: keyof typeof navigationActions) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
      }}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{
          borderRadius: "16px 16px 0 0",
          backgroundColor: "transparent",
          height: "auto",
        }}
      >
        {Object.values(navigationActions).map((action) => (
          <BottomNavigationAction
            key={action.value}
            LinkComponent={Link}
            href={action.path}
            label={action.label}
            value={action.value}
            icon={action.icon}
            sx={{ py: 2 }}
          />
        ))}
      </BottomNavigation>

      <AnimationBottomFab />
    </Paper>
  );
};

export default AppBottomNavigation;
