import { IconButton } from "@mui/material";
import Image from "next/image";

const AppLogo = () => {
  return (
    <IconButton href={"/"} sx={{ py: 2, px: 0 }}>
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
