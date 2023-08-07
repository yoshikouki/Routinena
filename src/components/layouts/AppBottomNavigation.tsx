"use client";

import DoneIcon from "@mui/icons-material/Done";
import HomeIcon from "@mui/icons-material/Home";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type SyntheticEvent } from "react";
import { BottomAnimationFab } from "./BottomAnimationFab";

const navigationActions = {
  dashboard: {
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
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(
    () =>
      Object.values(navigationActions).find(
        (action) => action.path === pathname,
      )?.value || "other",
  );

  const onClickBottomNavigation = (
    _: SyntheticEvent,
    newValue: keyof typeof navigationActions,
  ) => {
    setValue(newValue);
    if (navigationActions[newValue]?.path === pathname) {
      router.refresh();
    }
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
        zIndex: 1200,
        backdropFilter: "blur(2px)",
      }}
    >
      <BottomNavigation
        value={value}
        onChange={onClickBottomNavigation}
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

      <BottomAnimationFab />
    </Paper>
  );
};

export default AppBottomNavigation;
