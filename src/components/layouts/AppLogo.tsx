"use client";

import {
  IconButton
} from "@mui/material";
import Image from "next/image";

interface Props {}

const AppLogo = ({}: Props) => {
  return (
    <IconButton href={"/"}>
      <Image
        src="/icons/apple-touch-icon.png"
        alt="ルーティンナさん"
        width={40}
        height={40}
        style={{ borderRadius: "100%" }}
      />
    </IconButton>
  );
};

export default AppLogo;
